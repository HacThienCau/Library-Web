package com.library_web.library.Service;

import com.library_web.library.Model.Notification;
import com.library_web.library.Repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepo notificationRepository;

    // Gửi thông báo mới
    public Notification sendNotification(String userId, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setTimestamp(LocalDateTime.now());
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll(); // Trả về tất cả thông báo trong database
    }

    // Lấy tất cả thông báo của người dùng theo userId
    public List<Notification> getAllNotifications(String userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);

        // Sắp xếp danh sách thông báo theo ngày (mới nhất trước)
        Collections.sort(notifications, new Comparator<Notification>() {
            @Override
            public int compare(Notification n1, Notification n2) {
                return n2.getTimestamp().compareTo(n1.getTimestamp());
            }
        });

        return notifications;
    }

    // Lấy thông báo chưa đọc
    public List<Notification> getUnreadNotifications(String userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, false);
    }

    // Đánh dấu thông báo là đã đọc
    public Notification markAsRead(String id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ko tìm thấy thông báo"));
        if (!notification.isRead()) {
            notification.setRead(true);
            return notificationRepository.save(notification);
        }
        return notification;
    }
}
