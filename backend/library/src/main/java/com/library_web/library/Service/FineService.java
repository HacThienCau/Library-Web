package com.library_web.library.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Model.Fine;
import com.library_web.library.Model.User;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.ChildBookRepo;
import com.library_web.library.Repository.FineRepo;
import com.library_web.library.Repository.UserRepo;

@Service
public class FineService {

    @Autowired
    private ChildBookRepo childBookRepo;
    @Autowired
    private FineRepo fineRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EmailService mailService;
    @Autowired
    private ChildBookService childBookService;
    @Autowired
    private BorrowCardRepo borrowCardRepo;
    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private NotificationService notificationService;

    public Fine addFine(Fine fine) {
        fine.setTrangThai(Fine.TrangThai.CHUA_THANH_TOAN);
        Fine savedFine = fineRepo.save(fine);
        if (savedFine.getNoiDung().toString().equals("Làm mất sách")) {
            ChildBook child = childBookRepo.findById(savedFine.getCardId())
                    .orElseThrow(
                            () -> new RuntimeException("Không tìm thấy sách con với id: " + savedFine.getCardId()));
            child.setTrangThai(ChildBook.TrangThai.DA_XOA);
            childBookRepo.save(child);
            Book book = bookRepo.findById(child.getIdParent())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với id: " + child.getIdParent()));
            book.setSoLuongXoa(book.getSoLuongXoa() + 1);
            bookRepo.save(book);
        }

        mailService.mailFine(savedFine);
        String message = "Bạn đã bị phạt " + fine.getSoTien()
                + "VND. Vui lòng thanh toán tiền phạt sớm nhất.\nID Phiếu phạt: " + savedFine.getId();
        notificationService.sendNotification(savedFine.getUserId(), message);
        return savedFine;
    }

    public List<Fine> getAllFines() {
        return fineRepo.findAll();
    }

    public Map<String, Object> getById(String id) {
        Fine fine = fineRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu phạt với id: " + id));
        User user = userRepo.findById(fine.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        Object cardId;
        if (fine.getNoiDung().toString().equals("Khác")) {
            cardId = fine.getCardId(); // String
        } else if (fine.getNoiDung().toString().equals("Làm mất sách")) {
            cardId = childBookService.getChildAndParent(fine.getCardId()); // Map<String,Object> childbook+parentBook
        } else {
            cardId = borrowCardRepo.findById(fine.getCardId());
        }
        Map<String, Object> data = Map.of(
                "id", fine.getId(),
                "userId", fine.getUserId(),
                "soTien", fine.getSoTien(),
                "noiDung", fine.getNoiDung(),
                "cardId", cardId,
                "trangThai", fine.getTrangThai(),
                "ngayThanhToan", fine.getNgayThanhToan() != null ? fine.getNgayThanhToan() : "",
                "tenND", user.getTenND(),
                "email", user.getEmail());

        return data;
    }

    public String thanhToan(String id) {
        try {
            Fine fine = fineRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu phạt với id: " + id));
            fine.setNgayThanhToan(LocalDateTime.now());
            fine.setTrangThai(Fine.TrangThai.DA_THANH_TOAN);
            fineRepo.save(fine);
            mailService.mailPay(fine); // gửi mail thông báo
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
    }

    public List<Fine> getFinesByUserId(String userId) {
        return fineRepo.findByUserId(userId); // Trả về tất cả phiếu phạt của userId
    }
}
