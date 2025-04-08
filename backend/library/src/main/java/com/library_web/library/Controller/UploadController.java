package com.library_web.library.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

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
}