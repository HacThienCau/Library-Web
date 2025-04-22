package com.library_web.library.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    private String id; // ID của thông báo
    private String userId; // ID người dùng nhận thông báo
    private String message; // Nội dung thông báo
    private LocalDateTime timestamp; // Thời gian tạo thông báo
    private boolean isRead; // Trạng thái đọc của thông báo

    // Enum trạng thái thông báo
    public enum Status {
        NEW("Mới"),
        READ("Đã đọc");

        private final String description;

        Status(String description) {
            this.description = description;
        }

        @com.fasterxml.jackson.annotation.JsonValue
        public String getDescription() {
            return description;
        }
    }
}
