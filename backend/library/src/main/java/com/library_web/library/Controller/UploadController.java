package com.library_web.library.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Model.User;

import javax.imageio.ImageIO;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private Cloudinary cloudinary;

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
public ResponseEntity<?> uploadBarcode(@RequestParam("file") MultipartFile file, @RequestParam("type") String type) {
    if (file.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Không có tệp được chọn"));
    }

    try {
         // 1. Đọc và chuyển ảnh sang grayscale
         BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
         BufferedImage grayscale = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
         Graphics g = grayscale.getGraphics();
         g.drawImage(bufferedImage, 0, 0, null);
         g.dispose();

        // 2. Tạo binary bitmap từ ảnh
        LuminanceSource source = new BufferedImageLuminanceSource(grayscale);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        Map<DecodeHintType, Object> hints = new HashMap<>();
        hints.put(DecodeHintType.TRY_HARDER, Boolean.TRUE);
        hints.put(DecodeHintType.POSSIBLE_FORMATS, Arrays.asList(BarcodeFormat.CODE_128, BarcodeFormat.CODE_39));
        Result result = new MultiFormatReader().decode(bitmap, hints);
        String decodedText = result.getText();

        // 3. Kiểm tra định dạng Mongo ID
        if (!decodedText.matches("^[a-fA-F0-9]{24}$")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mã không hợp lệ", "raw", decodedText));
        }

        // 4. Gọi API tùy theo type
        RestTemplate restTemplate = new RestTemplate();
        if (type.equals("book")) {
            String apiUrl = "http://localhost:8081/child/" + decodedText; // Đổi lại nếu cần
            try{
                ResponseEntity<ChildBook> response = restTemplate.getForEntity(apiUrl, ChildBook.class);
                ChildBook child = response.getBody();
                if (child == null) {
                    return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy sách con"));
                }
                Map<String, Object> parentBook = null;
                if (child.getIdParent() != null) {
                    String parentUrl = "http://localhost:8081/book/" + child.getIdParent();
                    ResponseEntity<Map<String, Object>> parentResponse = restTemplate.exchange(parentUrl,HttpMethod.GET,null,new ParameterizedTypeReference<Map<String, Object>>() {});
                    if (parentResponse.getStatusCode().is2xxSuccessful()) {
                        parentBook = parentResponse.getBody();
                    }
                }
                return ResponseEntity.ok(Map.of(
                        "childBook", child,
                        "parentBook", parentBook
                ));    
            } catch (HttpClientErrorException.NotFound e) {
                return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy sách con"));
            }
        }else{
            try {
                String apiUrl = "http://localhost:8081/user/" + decodedText;
                ResponseEntity<User> response = restTemplate.getForEntity(apiUrl, User.class);
                if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                    return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy người dùng"));
                }
                return ResponseEntity.ok(Map.of("user", response.getBody()));
            } catch (HttpClientErrorException.NotFound e) {
                return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy người dùng"));
            }
        }

    } catch (NotFoundException e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy mã barcode trong ảnh."));
    } catch (IOException e) {
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi xử lý ảnh."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi không xác định: " + e.getMessage()));
    }
}
}