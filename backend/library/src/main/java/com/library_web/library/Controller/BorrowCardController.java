package com.library_web.library.Controller;

import com.library_web.library.Service.BorrowCardService;
import com.library_web.library.DTO.BorrowCardDetail;
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
    public ResponseEntity<BorrowCard> borrowBooks(@PathVariable String id, @RequestBody List<String> childBookIds) {
        BorrowCard borrowCard = borrowCardService.updateBorrowCardToBorrowing(id,childBookIds);
        return ResponseEntity.ok(borrowCard);
    }

    // Cập nhật phiếu mượn khi người dùng trả sách
    @PutMapping("/return/{id}")
    public ResponseEntity<BorrowCard> returnBooks(@PathVariable String id) {
        BorrowCard borrowCard = borrowCardService.updateBorrowCardOnReturn(id);
        return ResponseEntity.ok(borrowCard);
    }
    
    // Cập nhật phiếu mượn khi người dùng trả sách
    @PutMapping("/expired/{id}")
    public ResponseEntity<BorrowCard> expiredCard(@PathVariable String id) {
        BorrowCard borrowCard = borrowCardService.expiredCard(id);
        return ResponseEntity.ok(borrowCard);
    }

    // Lấy tất cả phiếu mượn theo người dùng
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowCard>> getBorrowCardsByUserId(@PathVariable String userId) {
        List<BorrowCard> borrowCards = borrowCardService.getBorrowCardsByUserId(userId);
        if (borrowCards.isEmpty()) {
            return ResponseEntity.status(204).build(); // Trả về trạng thái 204 nếu không có dữ liệu
        }
        return ResponseEntity.ok(borrowCards); // Trả về danh sách phiếu mượn của người dùng
    }

    // Lấy thông tin chi tiết phiếu mượn theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BorrowCardDetail> getBorrowCardDetails(@PathVariable String id) {
        BorrowCardDetail details = borrowCardService.getBorrowCardDetails(id);
        return ResponseEntity.ok(details);
    }

    // Lấy tất cả phiếu mượn
    @GetMapping("/")
    public ResponseEntity<List<BorrowCard>> getAllBorrowCard() {
        List<BorrowCard> borrowCards = borrowCardService.getAllBorrowCard();
        if (borrowCards.isEmpty()) {
            return ResponseEntity.status(204).build(); // Trả về trạng thái 204 nếu không có dữ liệu
        }
        return ResponseEntity.ok(borrowCards);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBorrowCard(@PathVariable String id) {
        try {
            borrowCardService.deleteBorrowCard(id);
            return ResponseEntity.ok("Xóa phiếu mượn thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Không tìm thấy phiếu mượn!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi xóa phiếu mượn!");
        }
    }
}
