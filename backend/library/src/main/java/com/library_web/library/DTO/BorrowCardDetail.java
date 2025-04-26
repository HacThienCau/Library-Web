package com.library_web.library.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowCardDetail {
    private String borrowCardId;
    private String userId;
    private String userName;
    private LocalDateTime borrowDate;
    private LocalDateTime getBookDate; // Ngày lấy sách (hạn lấy sách)
    private LocalDateTime dueDate;
    private int totalBooks;  // Số lượng sách mượn
    private List<BookInfo> books;  // Danh sách sách mượn kèm thông tin

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookInfo {
        private String image;
        private String name;
        private String author;
        private String category;
        private String publisher;
        private int borrowCount;
    }
}
