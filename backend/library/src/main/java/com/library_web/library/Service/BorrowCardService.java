package com.library_web.library.Service;

import com.library_web.library.DTO.BorrowCardDetail;
import com.library_web.library.Model.Book;
import com.library_web.library.Model.BorrowCard;
import com.library_web.library.Model.Category;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Model.Fine;
import com.library_web.library.Model.User;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.CategoryRepo;
import com.library_web.library.Repository.ChildBookRepo;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
    @Autowired
    private EmailService emailService;
    @Autowired
    private FineService fineService;
    @Autowired
    private NotificationService notificationService;

    // Tạo phiếu mượn khi người dùng bấm đăng ký mượn
    public BorrowCard createBorrowCard(String userId, List<String> bookIds) {
        LocalDateTime borrowDate = LocalDateTime.now();
        int waitingToTake = settingService.getSetting().getWaitingToTake();
        BorrowCard borrowCard = new BorrowCard(userId, borrowDate, waitingToTake, bookIds);
        for (String bookId : bookIds) {
            Book book = bookRepo.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với id: " + bookId));
            book.setSoLuongMuon(book.getSoLuongMuon() + 1);
            bookRepo.save(book); // lưu lại từng sách
        }
        borrowCard = borrowCardRepo.save(borrowCard);
        String message = "Bạn đã tạo phiếu mượn sách thành công! Vui lòng đến lấy sách trong thời gian sớm nhất nhé!\nID Phiếu mượn: "
                + borrowCard.getId();
        notificationService.sendNotification(borrowCard.getUserId(), message);
        return borrowCard;
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
        // Thêm danh sách sách con
        borrowCard.setChildBookIds(childBookIds);
        // Cập nhật sách con
        for (String childId : childBookIds) {
            ChildBook child = childBookRepo.findById(childId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách con với id: " + childId));
            child.setTrangThai(ChildBook.TrangThai.DANG_MUON);
            childBookRepo.save(child); // lưu lại từng sách con
        }
        // gửi mail thông báo
        emailService.mailTaken(borrowCard);
        // Gửi thông báo đến người dùng
        String message = "Bạn đã mượn sách thành công. ID Phiếu mượn: "
                + borrowCard.getId();
        notificationService.sendNotification(borrowCard.getUserId(), message);
        // Lưu phiếu mượn đã cập nhật
        return borrowCardRepo.save(borrowCard);
    }

    // Cập nhật trạng thái phiếu mượn khi người dùng trả sách
    public BorrowCard updateBorrowCardOnReturn(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Nếu phiếu mượn vẫn còn đang mượn thì cập nhật trạng thái
        if (borrowCard.getStatus().equals("Đang mượn")) {
            borrowCard.setStatus("Hết hạn");
        }
        borrowCard.updateStatus();
        // Nếu trả trễ
        long soNgayTre = ChronoUnit.DAYS.between(borrowCard.getDueDate(), LocalDateTime.now());
        if (soNgayTre < 0) {
            soNgayTre = 0; // chưa trễ hạn
        } else {
            Fine data = new Fine();
            int finePerDay = settingService.getSetting().getFinePerDay();
            data.setNoiDung("Trả sách trễ hạn");
            data.setSoTien(soNgayTre * finePerDay);
            data.setCardId(borrowCard.getId());
            data.setUserId(borrowCard.getUserId());
            fineService.addFine(data);
            // Gửi thông báo trả sách trễ
            String message = "Bạn đã trả sách trễ " + soNgayTre
                    + " ngày. Vui lòng thanh toán tiền phạt sớm nhất.\nID Phiếu mượn: " + borrowCard.getId();
            notificationService.sendNotification(borrowCard.getUserId(), message);
        }
        // Nếu không trễ, gửi thông báo trả sách thành công
        if (soNgayTre == 0) {
            String message = "Bạn đã trả sách thành công! ID Phiếu mượn: " + borrowCard.getId();
            notificationService.sendNotification(borrowCard.getUserId(), message);
        }
        borrowCard.setSoNgayTre(soNgayTre);
        // Cập nhật ngày trả
        borrowCard.setDueDate(LocalDateTime.now());
        // Cập nhật sách con
        List<String> childBookIds = borrowCard.getChildBookIds();
        for (String childId : childBookIds) {
            ChildBook child = childBookRepo.findById(childId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách con với id: " + childId));
            if (child.getTrangThai() == ChildBook.TrangThai.DANG_MUON)
                child.setTrangThai(ChildBook.TrangThai.CON_SAN);
            childBookRepo.save(child); // lưu lại từng sách con
        }
        // Cập nhật số lượng sách available
        List<String> bookIds = borrowCard.getBookIds();
        for (String bookId : bookIds) {
            Book book = bookRepo.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với id: " + bookId));
            book.setSoLuongMuon(book.getSoLuongMuon() - 1);
            bookRepo.save(book); // lưu lại từng sách
        }
        emailService.mailReturned(borrowCard);
        return borrowCardRepo.save(borrowCard);
    }

    public BorrowCard expiredCard(String id) {
        BorrowCard borrowCard = borrowCardRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Nếu phiếu mượn vẫn còn đang yêu cầu thì cập nhật trạng thái
        if (borrowCard.getStatus().equals("Đang yêu cầu")) {
            borrowCard.setStatus("Hết hạn");
        }
        // Cập nhật số lượng sách available
        List<String> bookIds = borrowCard.getBookIds();
        for (String bookId : bookIds) {
            Book book = bookRepo.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với id: " + bookId));
            book.setSoLuongMuon(book.getSoLuongMuon() - 1);
            bookRepo.save(book); // lưu lại từng sách
        }
        emailService.mailExpired(borrowCard);
        // Gửi thông báo hết hạn
        String message = "Phiếu mượn ID:" + borrowCard.getId()
                + " của bạn đã bị hủy. Vui lòng check mail để biết thêm chi tiết.";
        notificationService.sendNotification(borrowCard.getUserId(), message);
        return borrowCardRepo.save(borrowCard);
    }

    // Lấy tất cả phiếu mượn theo userId
    public List<BorrowCard> getBorrowCardsByUserId(String userId) {
        return borrowCardRepo.findByUserId(userId); // Trả về tất cả phiếu mượn của userId
    }

    // Lấy tất cả phiếu mượn theo userId
    public List<BorrowCard> getAllBorrowCard() {
        return borrowCardRepo.findAll(); // Trả về tất cả phiếu mượn
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
                    book.getId(),
                    book.getHinhAnh().get(0),
                    book.getTenSach(),
                    book.getTenTacGia(),
                    category.getTenTheLoaiCon(), // Lấy tên thể loại con
                    book.getNxb(),
                    book.getSoLuongMuon(),
                    category.getViTri());
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
        if (borrowCard.getStatus().equals("Đang mượn") || borrowCard.getStatus().equals("Hết hạn")) {
            throw new RuntimeException("Chỉ có thể xóa phiếu khi còn ở trạng thái 'Đang yêu cầu'");
        }
        // khi đăng ký mượn = đăng ký trước chỗ => xóa phiếu đăng ký = xóa chỗ đã mượn
        if (borrowCard.getStatus().equals("Đang yêu cầu")) {
            List<String> bookIds = borrowCard.getBookIds();
            for (String bookId : bookIds) {
                Book book = bookRepo.findById(bookId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với id: " + bookId));
                book.setSoLuongMuon(book.getSoLuongMuon() - 1);
                bookRepo.save(book); // lưu lại từng sách
            }
        }
        borrowCardRepo.delete(borrowCard);
    }

    public void removeBookFromBorrowCard(String borrowCardId, String bookId) {
        // Lấy phiếu mượn từ MongoDB theo borrowCardId
        BorrowCard borrowCard = borrowCardRepo.findById(borrowCardId)
                .orElseThrow(() -> new RuntimeException("Phiếu mượn không tồn tại"));

        // Kiểm tra trạng thái, chỉ có thể xóa sách khi phiếu mượn có trạng thái "Đang
        // yêu cầu"
        if (!"Đang yêu cầu".equals(borrowCard.getStatus())) {
            throw new RuntimeException("Chỉ có thể xóa sách khi trạng thái là 'Đang yêu cầu'");
        }

        // Kiểm tra nếu sách không tồn tại trong mảng bookIds
        List<String> bookIds = borrowCard.getBookIds();
        if (!bookIds.contains(bookId)) {
            throw new RuntimeException("Sách không tồn tại trong phiếu mượn");
        }

        // Xóa sách khỏi mảng bookIds
        bookIds.remove(bookId);
        borrowCard.setBookIds(bookIds);

        // Nếu không còn sách nào trong phiếu mượn, xóa phiếu mượn
        if (bookIds.isEmpty()) {
            borrowCardRepo.delete(borrowCard);
        } else {
            borrowCardRepo.save(borrowCard);
        }

        // Cập nhật lại số lượng sách mượn trong Book
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với id: " + bookId));
        book.setSoLuongMuon(book.getSoLuongMuon() - 1);
        bookRepo.save(book);
    }

    // Đếm tổng số sách đang mượn (tức các BorrowCard có status "Đang mượn")
    public int countBooksBeingBorrowed(String userId) {
        List<BorrowCard> borrowCards = borrowCardRepo.findByUserId(userId);
        return borrowCards.stream()
                .filter(bc -> "Đang mượn".equals(bc.getStatus()))
                .mapToInt(bc -> bc.getBookIds().size())
                .sum();
    }

    // Đếm tổng số sách quá hạn (tức các BorrowCard có status "Hết hạn")
    public int countBooksOverdue(String userId) {
        List<BorrowCard> borrowCards = borrowCardRepo.findByUserId(userId);
        return borrowCards.stream()
                .filter(bc -> "Hết hạn".equals(bc.getStatus()))
                .mapToInt(bc -> bc.getBookIds().size())
                .sum();
    }
}
