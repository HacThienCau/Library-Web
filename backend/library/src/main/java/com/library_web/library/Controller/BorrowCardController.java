package com.library_web.library.Controller;

import com.library_web.library.Service.BorrowCardService;
import com.library_web.library.Model.BorrowCard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/borrow-card")
public class BorrowCardController {

    @Autowired
    private BorrowCardService borrowCardService;

    // Tạo phiếu mượn
    @PostMapping("/create")
    public ResponseEntity<BorrowCard> createBorrowCard(@RequestBody BorrowCard borrowCardRequest) {
        BorrowCard borrowCard = borrowCardService.createBorrowCard(
                borrowCardRequest.getUserId(),
                borrowCardRequest.getBookIds());
        return ResponseEntity.ok(borrowCard);
    }

    // Cập nhật phiếu mượn khi người dùng đến lấy sách
    @PutMapping("/borrow/{id}")
    public ResponseEntity<BorrowCard> borrowBooks(@PathVariable String id) {
        BorrowCard borrowCard = borrowCardService.updateBorrowCardToBorrowing(id);
        return ResponseEntity.ok(borrowCard);
    }

    // Cập nhật phiếu mượn khi người dùng trả sách (hoặc quá hạn)
    @PutMapping("/return/{id}")
    public ResponseEntity<BorrowCard> returnBooks(@PathVariable String id) {
        BorrowCard borrowCard = borrowCardService.updateBorrowCardOnReturn(id);
        return ResponseEntity.ok(borrowCard);
    }

    // Lấy tất cả phiếu mượn theo người dùng
    @GetMapping("/{userId}")
    public ResponseEntity<List<BorrowCard>> getBorrowCardsByUserId(@PathVariable String userId) {
        List<BorrowCard> borrowCards = borrowCardService.getBorrowCardsByUserId(userId);
        if (borrowCards.isEmpty()) {
            return ResponseEntity.noContent().build(); // Trả về trạng thái 204 nếu không có dữ liệu
        }
        return ResponseEntity.ok(borrowCards); // Trả về danh sách phiếu mượn của người dùng
    }

    // Lấy thông tin chi tiết phiếu mượn theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BorrowCard> getBorrowCardDetails(@PathVariable String id) {
        BorrowCard borrowCard = borrowCardService.getBorrowCardDetails(id);
        if (borrowCard == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(borrowCard);
    }
}
