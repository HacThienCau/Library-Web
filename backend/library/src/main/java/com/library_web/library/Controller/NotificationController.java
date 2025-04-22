package com.library_web.library.Controller;

import com.library_web.library.Model.Notification;
import com.library_web.library.Service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Gửi thông báo mới
    @PostMapping("/send")
    public ResponseEntity<Notification> sendNotification(@RequestParam String userId, @RequestParam String message) {
        Notification notification = notificationService.sendNotification(userId, message);
        return ResponseEntity.ok(notification);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }
    
    // Lấy tất cả thông báo của người dùng
    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getAllNotifications(@PathVariable String userId) {
        List<Notification> notifications = notificationService.getAllNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    // Lấy thông báo chưa đọc của người dùng
    @GetMapping("/unread/{userId}")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable String userId) {
        List<Notification> notifications = notificationService.getUnreadNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    // Đánh dấu thông báo đã đọc
    @PutMapping("/mark-as-read/{id}")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        Notification notification = notificationService.markAsRead(id);
        if (notification == null) {
            return ResponseEntity.status(404).body(null); // Nếu không tìm thấy thông báo
        }
        return ResponseEntity.ok(notification);
    }
}