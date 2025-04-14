package com.library_web.library.Controller;

import com.library_web.library.Service.UploadService;
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
}
