package com.library_web.library.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Rect;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Model.User;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private Cloudinary cloudinary;
    static{
        System.load(new File("backend/library/src/main/resources/native/opencv_java460.dll").getAbsolutePath());
		System.out.println("OpenCV version: " + Core.VERSION);
    }
    @PostMapping("/image")
public ResponseEntity<?> uploadImages(@RequestParam("file") MultipartFile[] files) {
    try {
        List<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {
            // In ra thông tin từng file
            System.out.println("==> Received:");
            System.out.println("Name: " + file.getOriginalFilename());
            System.out.println("Size: " + file.getSize() + " bytes");

            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader()
                .upload(file.getBytes(), ObjectUtils.emptyMap());

            urls.add((String) uploadResult.get("secure_url"));
        }

        return ResponseEntity.ok(urls);
    } catch (IOException e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Lỗi upload ảnh: " + e.getMessage()));
    }
    }

@PostMapping("/barcodeImage")
public ResponseEntity<?> uploadBarcode(@RequestParam("file") MultipartFile file,
                                       @RequestParam("type") String type) {
    if (file.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Không có tệp được chọn"));
    }

    try {
        // ✨ Lần đầu thử decode trực tiếp bằng ZXing (không dùng OpenCV)
        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(
                new BufferedImageLuminanceSource(bufferedImage)));
        Map<DecodeHintType, Object> hints = Map.of(
                DecodeHintType.POSSIBLE_FORMATS, List.of(BarcodeFormat.CODE_128, BarcodeFormat.CODE_39, BarcodeFormat.QR_CODE)
        );

        try {
            Result result = new MultiFormatReader().decode(bitmap, hints);
            return handleDecodedResult(result.getText(), type);
        } catch (NotFoundException e) {
            // ✨ Nếu không đọc được -> dùng OpenCV để crop barcode và thử lại
            System.out.println("Try with Open CV");
            return tryWithOpenCV(file, type);
        }

    } catch (IOException e) {
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi xử lý ảnh: " + e.getMessage()));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi không xác định: " + e.getMessage()));
    }
}

private ResponseEntity<?> tryWithOpenCV(MultipartFile file, String type) {
    try {
        // Đọc ảnh với OpenCV
        File tempFile = File.createTempFile("upload-", ".tmp");
        file.transferTo(tempFile);
        Mat original = Imgcodecs.imread(tempFile.getAbsolutePath(), Imgcodecs.IMREAD_COLOR);
        tempFile.delete();

        if (original.empty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Không thể đọc ảnh."));
        }

        // Đưa ảnh về xám
        Mat gray = new Mat();
        Imgproc.cvtColor(original, gray, Imgproc.COLOR_BGR2GRAY);

        // Danh sách các ngưỡng cần thử (ngưỡng thấp, ngưỡng cao)
        int[][] thresholds = {
            {10,50},
            {30,70},
            {50,100},
            {100, 200},
            {200, 400},
            {300, 700},
            {500, 1000},
            {700, 1500},
            {1000, 2000}
        };

        for (int[] threshold : thresholds) {
            try {
                // Clone ảnh gốc xám vì Canny thay đổi ảnh đầu vào
                Mat grayCopy = gray.clone();

                // Áp dụng Canny với ngưỡng hiện tại
                Mat edged = new Mat();
                Imgproc.Canny(grayCopy, edged, threshold[0], threshold[1]);

                // Làm đầy lỗ hổng barcode bằng morphology
                Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(21, 7));
                Imgproc.morphologyEx(edged, edged, Imgproc.MORPH_CLOSE, kernel);

                // Tìm contours
                List<MatOfPoint> contours = new ArrayList<>();
                Mat hierarchy = new Mat();
                Imgproc.findContours(edged, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

                Rect bestRect = null;
                double maxArea = 0;
                for (MatOfPoint contour : contours) {
                    Rect rect = Imgproc.boundingRect(contour);
                    if (rect.area() > maxArea && rect.area() > 1000) {
                        bestRect = rect;
                        maxArea = rect.area();
                    }
                }

                if (bestRect == null) continue;

                Mat cropped = new Mat(original, bestRect);

                // Decode với ZXing
                MatOfByte buffer = new MatOfByte();
                Imgcodecs.imencode(".png", cropped, buffer);
                BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(buffer.toArray()));

                BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(
                        new BufferedImageLuminanceSource(bufferedImage)));
                Map<DecodeHintType, Object> hints = Map.of(
                        DecodeHintType.POSSIBLE_FORMATS, List.of(BarcodeFormat.CODE_128, BarcodeFormat.CODE_39, BarcodeFormat.QR_CODE)
                );

                Result result = new MultiFormatReader().decode(bitmap, hints);

                // Nếu thành công, trả về kết quả
                return handleDecodedResult(result.getText(), type);

            } catch (NotFoundException e) {
                // Không tìm thấy barcode ở ngưỡng này, thử tiếp
            }
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy mã barcode. Vui lòng gửi lại ảnh chụp."));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi OpenCV: " + e.getMessage()));
    }
}

    private ResponseEntity<?> handleDecodedResult(String decodedText, String type) {
        if (!decodedText.matches("^[a-fA-F0-9]{24}$")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mã không hợp lệ", "raw", decodedText));
        }
    
        try {
            RestTemplate restTemplate = new RestTemplate();
            if (type.equals("book")) {
                String apiUrl = "http://localhost:8081/child/" + decodedText;
                ResponseEntity<ChildBook> response = restTemplate.getForEntity(apiUrl, ChildBook.class);
                if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                    return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy sách con"));
                }
    
                ChildBook child = response.getBody();
                Map<String, Object> parentBook = null;
    
                if (child!=null && child.getIdParent() != null) {
                    String parentUrl = "http://localhost:8081/book/" + child.getIdParent();
                    ResponseEntity<Map<String, Object>> parentResponse = restTemplate.exchange(
                            parentUrl,
                            HttpMethod.GET,
                            null,
                            new ParameterizedTypeReference<>() {});
                    parentBook = parentResponse.getBody();
                }
    
                return ResponseEntity.ok(Map.of("childBook", child, "parentBook", parentBook));
    
            } else {
                try{
                    String apiUrl = "http://localhost:8081/user/" + decodedText;
                    ResponseEntity<User> response = restTemplate.getForEntity(apiUrl, User.class);
                    return ResponseEntity.ok(Map.of("user", response.getBody()));
                }catch(Exception e){
                    return ResponseEntity.status(404).body(Map.of("error", "ID người dùng không tồn tại."));
                }
            }
    
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi truy vấn API: " + e.getMessage()));
        }
    }
}
