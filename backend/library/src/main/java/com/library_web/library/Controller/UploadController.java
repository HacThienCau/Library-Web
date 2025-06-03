package com.library_web.library.Controller;

import com.library_web.library.Service.UploadService;

import java.awt.image.BufferedImage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/image")
    public ResponseEntity<?> uploadImages(@RequestParam("file") MultipartFile[] files) {
        return uploadService.uploadImages(files);
    }

    @PostMapping("/barcodeImage")
    public ResponseEntity<?> uploadBarcode(@RequestParam("file") MultipartFile file,
                                           @RequestParam("type") String type) {
        return uploadService.uploadBarcode(file, type);
    }

    // generate sách lẻ (dùng để debug)
    @PostMapping("/childBook/generate")
    public ResponseEntity<?> generateBarcode(@RequestParam String name,@RequestParam String id) {
        try {
        BufferedImage barcodeImage = uploadService.generateBarcodeImage(id);
        com.google.api.services.drive.model.File uploadedFile = uploadService.uploadBarcodeToDrive(barcodeImage, name + "_" + id); 
        return ResponseEntity.ok().body("Upload successful: " + uploadedFile.getWebViewLink());
    } catch (Exception e) {
        return ResponseEntity.status(400).body("Upload failed: " + e.getMessage());
        }
    }

    // generate barcode người dùng
    @PostMapping("/user/generate")
    public ResponseEntity<?> generateUserBarcode(@RequestParam String name,@RequestParam String id) {
        try {
        BufferedImage barcodeImage = uploadService.generateBarcodeImage(id);
        com.google.api.services.drive.model.File uploadedFile = uploadService.uploadUserBarcodeToDrive(barcodeImage, name + "_" + id); 
        return ResponseEntity.ok().body("Upload successful: " + uploadedFile.getWebViewLink());
    } catch (Exception e) {
        return ResponseEntity.status(400).body("Upload failed: " + e.getMessage());
        }
    }
}
