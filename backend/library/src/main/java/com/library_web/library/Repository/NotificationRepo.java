package com.library_web.library.Repository;

import com.library_web.library.Model.Notification;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepo extends MongoRepository<Notification, String> {
    // Thêm các phương thức truy vấn theo nhu cầu, ví dụ:
    List<Notification> findByUserIdAndIsRead(String userId, boolean isRead);

    List<Notification> findByUserId(String userId);
}
