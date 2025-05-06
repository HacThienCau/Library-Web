package com.library_web.library.Service;

import com.library_web.library.DTO.BorrowCardDetail;
import com.library_web.library.Model.Book;
import com.library_web.library.Model.BorrowCard;
import com.library_web.library.Model.Category;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Model.User;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.CategoryRepo;
import com.library_web.library.Repository.ChildBookRepo;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowCardService {

    @Autowired
    private BorrowCardRepo borrowCardRepo;
    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private ChildBookRepo childBookRepo;
    @Autowired
    private SettingService settingService;

    // Tạo phiếu mượn khi người dùng bấm đăng ký mượn
    public BorrowCard createBorrowCard(String userId, List<String> bookIds) {
        LocalDateTime borrowDate = LocalDateTime.now();
        BorrowCard borrowCard = new BorrowCard(userId, borrowDate, bookIds);

        return borrowCardRepo.save(borrowCard);
    }

    // Cập nhật phiếu mượn khi người dùng đến lấy sách
    public BorrowCard updateBorrowCardToBorrowing(String id, List<String> childBookIds) {
        BorrowCard borrowCard = borrowCardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Cập nhật trạng thái phiếu mượn thành "Đang mượn"
        borrowCard.setStatus("Đang mượn");
        // Cập nhật ngày mượn
        borrowCard.setGetBookDate(LocalDateTime.now());
        // Tính toán ngày trả sách (theo setting)
        int borrowDay = settingService.getSetting().getBorrowDay();
        borrowCard.setDueDate(LocalDateTime.now().plusDays(borrowDay));
        //Thêm danh sách sách con
        borrowCard.setChildBookIds(childBookIds);
        //Cập nhật sách con
        for (String childId : childBookIds) {
        ChildBook child = childBookRepo.findById(childId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách con với id: " + childId));
        child.setTrangThai(ChildBook.TrangThai.DANG_MUON);
        childBookRepo.save(child); // lưu lại từng sách con
        }
        // Lưu phiếu mượn đã cập nhật
        return borrowCardRepo.save(borrowCard);
    }

    // Cập nhật trạng thái phiếu mượn khi người dùng trả sách hoặc quá hạn
    public BorrowCard updateBorrowCardOnReturn(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Nếu phiếu mượn vẫn còn đang mượn thì cập nhật trạng thái
        if (borrowCard.getStatus().equals("Đang mượn")) {
            borrowCard.setStatus("Hết hạn");
        }
        borrowCard.updateStatus();
        //Cập nhật ngày trả
        borrowCard.setDueDate(LocalDateTime.now());
        //Cập nhật sách con
        List<String> childBookIds = borrowCard.getChildBookIds();
        for (String childId : childBookIds) {
            ChildBook child = childBookRepo.findById(childId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách con với id: " + childId));
            child.setTrangThai(ChildBook.TrangThai.CON_SAN);
            childBookRepo.save(child); // lưu lại từng sách con
            }
        return borrowCardRepo.save(borrowCard);
    }

    // Lấy tất cả phiếu mượn theo userId
    public List<BorrowCard> getBorrowCardsByUserId(String userId) {
        return borrowCardRepo.findByUserId(userId); // Trả về tất cả phiếu mượn của userId
    }

    // Lấy thông tin chi tiết phiếu mượn theo ID
    public BorrowCardDetail getBorrowCardDetails(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Cập nhật trạng thái trước khi trả về
        borrowCard.updateStatus();
        borrowCardRepo.save(borrowCard);
        User user = userRepo.findById(borrowCard.getUserId())
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        List<Book> books = bookRepo.findAllById(borrowCard.getBookIds());

        List<BorrowCardDetail.BookInfo> bookInfos = books.stream().map(book -> {
            Category category = categoryRepo.findById(book.getTheLoai())
                    .orElseThrow(() -> new RuntimeException("Thể loại không tồn tại"));

            return new BorrowCardDetail.BookInfo(
                    book.getHinhAnh().get(0),
                    book.getTenSach(),
                    book.getTenTacGia(),
                    category.getTenTheLoaiCon(), // Lấy tên thể loại con
                    book.getNxb(),
                    book.getSoLuongMuon());
        }).toList();

        return new BorrowCardDetail(
                borrowCard.getId(),
                user.getId(),
                user.getTenND(),
                borrowCard.getBorrowDate(),
                borrowCard.getGetBookDate(),
                borrowCard.getDueDate(),
                bookInfos.size(),
                bookInfos);
    }

    // Xóa phiếu mượn theo ID
    public void deleteBorrowCard(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));
        if (borrowCard.getStatus().equals("Đang mượn")) {
            throw new RuntimeException("Không thể xóa phiếu đang trong trạng thái 'Đang mượn'");
        }
        borrowCardRepo.delete(borrowCard);
    }
}
