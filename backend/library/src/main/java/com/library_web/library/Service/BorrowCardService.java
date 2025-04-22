package com.library_web.library.Service;

import com.library_web.library.Model.BorrowCard;
import com.library_web.library.Repository.BorrowCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowCardService {

    @Autowired
    private BorrowCardRepo borrowCardRepo;

    // Tạo phiếu mượn khi người dùng bấm đăng ký mượn
    public BorrowCard createBorrowCard(String userId, List<String> bookIds) {
        LocalDateTime borrowDate = LocalDateTime.now();
        BorrowCard borrowCard = new BorrowCard(userId, borrowDate, bookIds);

        return borrowCardRepo.save(borrowCard);
    }

    // Cập nhật phiếu mượn khi người dùng đến lấy sách
    public BorrowCard updateBorrowCardToBorrowing(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id).orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Cập nhật trạng thái phiếu mượn thành "Đang mượn"
        borrowCard.setStatus("Đang mượn");

        // Tính toán ngày trả sách (15 ngày sau khi lấy sách)
        borrowCard.setDueDate(borrowCard.getGetBookDate().plusDays(15));

        // Lưu phiếu mượn đã cập nhật
        return borrowCardRepo.save(borrowCard);
    }

    // Cập nhật trạng thái phiếu mượn khi người dùng trả sách hoặc quá hạn
    public BorrowCard updateBorrowCardOnReturn(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id).orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Nếu phiếu mượn vẫn còn đang mượn thì cập nhật trạng thái
        if (borrowCard.getStatus().equals("Đang mượn")) {
            borrowCard.setStatus("Đã trả");
        }

        borrowCard.updateStatus();

        return borrowCardRepo.save(borrowCard);
    }
    
    // Lấy tất cả phiếu mượn theo userId
    public List<BorrowCard> getBorrowCardsByUserId(String userId) {
        return borrowCardRepo.findByUserId(userId); // Trả về tất cả phiếu mượn của userId
    }

    // Lấy thông tin chi tiết phiếu mượn theo ID
    public BorrowCard getBorrowCardDetails(String id) {
        return borrowCardRepo.findById(id).orElse(null);
    }
}

