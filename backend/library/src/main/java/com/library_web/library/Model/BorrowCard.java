package com.library_web.library.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowCard {
    @Id
    private String id; // ID của phiếu mượn
    private String userId; // ID người mượn
    private LocalDateTime borrowDate; // Ngày mượn
    private LocalDateTime getBookDate; // Ngày lấy sách (hạn lấy sách)
    private LocalDateTime dueDate; // Ngày trả sách (hạn trả sách)
    private String status; // Trạng thái phiếu mượn (Đang yêu cầu / Đang mượn / Hết hạn)
    private List<String> bookIds; // Danh sách sách mượn
    private List<String> childBookIds; // Danh sách sách con
    // Enum cho các trạng thái của phiếu mượn
    public enum Status {
        REQUESTED("Đang yêu cầu"),
        BORROWED("Đang mượn"),
        EXPIRED("Hết hạn");  // Trạng thái "Hết hạn"

        private final String statusDescription;

        Status(String statusDescription) {
            this.statusDescription = statusDescription;
        }

        public String getStatusDescription() {
            return statusDescription;
        }
    }

    // Phương thức để tính toán trạng thái của phiếu mượn
    public void updateStatus() {
        if (this.status.equals(Status.BORROWED.getStatusDescription())) {
            // Kiểm tra nếu đã quá hạn trả sách
            if (this.dueDate != null && LocalDateTime.now().isAfter(this.dueDate)) {
                this.status = Status.EXPIRED.getStatusDescription();  // Đặt trạng thái là "Hết hạn"
            }
        }
    }

    public BorrowCard(String userId, LocalDateTime borrowDate, List<String> bookIds) {
        this.userId = userId;
        this.borrowDate = LocalDateTime.now(); // Ngày tạo phiếu là thời điểm hiện tại
        this.getBookDate = borrowDate.plusDays(3); // Hạn lấy sách
        this.status = Status.REQUESTED.getStatusDescription(); // Mới tạo phiếu mượn: trạng thái là "Đang yêu cầu"
        this.bookIds = bookIds;
    }
}
