package com.library_web.library.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.library_web.library.Model.Book;
import com.library_web.library.Model.Category;
import com.library_web.library.Model.ChildBook;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.InputStream;

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
        InputStream inputStream = file.getInputStream();
        BufferedImage bufferedImage = ImageIO.read(inputStream);

        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

        Result result = new MultiFormatReader().decode(bitmap);
        String decodedText = result.getText();

        // ✅ Kiểm tra xem có phải là MongoDB ObjectId không
        if (decodedText.matches("^[a-fA-F0-9]{24}$")) {
            // ✅ Gọi tiếp API nội bộ để lấy thông tin sách
            RestTemplate restTemplate = new RestTemplate();
            if (type.equals("book")) {
                String apiUrl = "http://localhost:8081/child/" + decodedText; // Đổi lại nếu cần
                ResponseEntity<ChildBook> response = restTemplate.getForEntity(apiUrl, ChildBook.class);
                if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                    return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy sách con"));
                }
                ChildBook child = response.getBody();
                Book parentBook = null;
                Category theLoaiInfo = null;
                if (child!=null && child.getIdParent() != null) {
                    String parentUrl = "http://localhost:8081/book/" + child.getIdParent();
                    ResponseEntity<Book> parentResponse = restTemplate.getForEntity(parentUrl, Book.class);
    
                    if (parentResponse.getStatusCode().is2xxSuccessful()) {
                        parentBook = parentResponse.getBody();
                    }
                    
                    if (parentBook != null && parentBook.getTheLoai() != null) {
                        String theLoaiUrl = "http://localhost:8081/category/" + parentBook.getTheLoai();
                        ResponseEntity<Category> theLoaiResponse = restTemplate.getForEntity(theLoaiUrl, Category.class);
            
                        if (theLoaiResponse.getStatusCode().is2xxSuccessful()) {
                            theLoaiInfo = theLoaiResponse.getBody(); // Chứa tenDanhMucCha, tenDanhMucCon, ...
                        }
                    }
                }
    
                // 3. Trả về cả sách con và sách cha (nếu có)
                Map<String, Object> resultMap = new HashMap<>();
                resultMap.put("childBook", child);
                if (parentBook != null) {
                    Map<String, Object> parentWithTheLoai = new HashMap<>();
                    parentWithTheLoai.put("book", parentBook);
                    parentWithTheLoai.put("theLoai", theLoaiInfo); // thêm thông tin thể loại
                
                    resultMap.put("parentBook", parentWithTheLoai);
                }
    
                return ResponseEntity.ok(resultMap);

            }
            // mấy cái khác làm sau
            else{
                String apiUrl = "http://localhost:8081/user/" + decodedText; // Đổi lại nếu cần
                ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
                if (response.getStatusCode().is2xxSuccessful()) {
                    return ResponseEntity.ok(Map.of(
                            "rs", response.getBody()
                    ));
                } else {
                    return ResponseEntity.status(response.getStatusCode())
                            .body(Map.of("error", "Không tìm thấy người dùng với ID đã quét."));
                }
            }
        
        } else {
            return ResponseEntity.ok(Map.of("raw", decodedText, "message", "Mã không hợp lệ"));
        }

    } catch (NotFoundException e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy mã barcode trong ảnh."));
    } catch (IOException e) {
        System.out.println(e);
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi xử lý ảnh."));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", "Lỗi không xác định: " + e.getMessage()));
    }
}
}