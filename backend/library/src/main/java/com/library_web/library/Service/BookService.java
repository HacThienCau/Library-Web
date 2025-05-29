package com.library_web.library.Service;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.BorrowCard;
import com.library_web.library.Model.Category;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.CategoryRepo;
import com.library_web.library.Repository.ChildBookRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private ChildBookRepo childBookRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired

    private BorrowCardRepo borrowCardRepo;

    private UploadService uploadService;

    public Book themBook(Book book) {
        book.setTrangThai(Book.TrangThai.CON_SAN);
        Book savedBook = bookRepo.save(book);
        String tenSach = book.getTenSach();

        List<String> childIdList = new ArrayList<>();
        List<String> barcodeLinks = new ArrayList<>();

        for (int i = 0; i < book.getTongSoLuong(); i++) {
            ChildBook child = new ChildBook();
            child.setIdParent(savedBook.getId());
            child.setTrangThai(ChildBook.TrangThai.CON_SAN);
            ChildBook savedChild = childBookRepo.save(child);

            String childId = savedChild.getId(); // Lấy ID đã được lưu
            childIdList.add(childId);
            try {
                BufferedImage barcodeImage = uploadService.generateBarcodeImage(childId);
                com.google.api.services.drive.model.File uploadedFile = uploadService.uploadBarcodeToDrive(barcodeImage, tenSach + "_" + childId);
                barcodeLinks.add(uploadedFile.getWebViewLink());
            } catch (Exception e) {
                e.printStackTrace();
            }            
        }
        return savedBook;
    }

    public List<Map<String, Object>> layTatCaBook() {
        List<Book> books = bookRepo.findByTrangThai(Book.TrangThai.CON_SAN);
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Book book : books) {
            Category cate = categoryRepo.findById(book.getTheLoai()).orElse(null);

            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("id", book.getId());
            resultMap.put("tenSach", book.getTenSach());
            resultMap.put("moTa", book.getMoTa());
            resultMap.put("hinhAnh", book.getHinhAnh());
            resultMap.put("theLoai", book.getTheLoai());
            resultMap.put("tenTacGia", book.getTenTacGia());
            resultMap.put("nxb", book.getNxb());
            resultMap.put("nam", book.getNam());
            resultMap.put("tongSoLuong", book.getTongSoLuong());
            resultMap.put("soLuongMuon", book.getSoLuongMuon());
            resultMap.put("gia", book.getGia());
            resultMap.put("soTrang", book.getSoTrang());
            resultMap.put("ngayTao", book.getNgayTao());
            resultMap.put("soLuongXoa", book.getSoLuongXoa());
            resultMap.put("trangThai", book.getTrangThai());

            if (cate != null) {
                resultMap.put("tenTheLoaiCha", cate.getTenTheLoaiCha());
                resultMap.put("tenTheLoaiCon", cate.getTenTheLoaiCon());
                resultMap.put("viTri", cate.getViTri());
            } else {
                resultMap.put("tenTheLoaiCha", null);
                resultMap.put("tenTheLoaiCon", null);
                resultMap.put("viTri", null);
            }

            resultList.add(resultMap);
        }

        return resultList;
    }

    public Map<String, Object> layBookTheoId(String id) {
        Book book = bookRepo.findById(id).orElse(null);
        Category cate = categoryRepo.findById(book.getTheLoai()).orElse(null);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", book.getId());
        resultMap.put("tenSach", book.getTenSach());
        resultMap.put("moTa", book.getMoTa());
        resultMap.put("hinhAnh", book.getHinhAnh());
        resultMap.put("theLoai", book.getTheLoai());
        resultMap.put("tenTacGia", book.getTenTacGia());
        resultMap.put("nxb", book.getNxb());
        resultMap.put("nam", book.getNam());
        resultMap.put("tongSoLuong", book.getTongSoLuong());
        resultMap.put("soLuongMuon", book.getSoLuongMuon());
        resultMap.put("soLuongXoa", book.getSoLuongXoa());
        resultMap.put("gia", book.getGia());
        resultMap.put("soTrang", book.getSoTrang());
        resultMap.put("ngayTao", book.getNgayTao());
        resultMap.put("soLuongXoa", book.getSoLuongXoa());
        resultMap.put("trangThai", book.getTrangThai());
        resultMap.put("tenTheLoaiCha", cate.getTenTheLoaiCha());
        resultMap.put("tenTheLoaiCon", cate.getTenTheLoaiCon());
        resultMap.put("viTri", cate.getViTri());

        return resultMap;
    }

    public Book capNhatBook(String id, Book bookMoi) {
        Optional<Book> optionalBook = bookRepo.findById(id);
        if (optionalBook.isPresent()) {
            Book bookCu = optionalBook.get();
            int oldSoLuong = bookCu.getTongSoLuong();
            int newSoLuong = bookMoi.getTongSoLuong();

            bookCu.setTenSach(bookMoi.getTenSach());
            bookCu.setMoTa(bookMoi.getMoTa());
            bookCu.setHinhAnh(bookMoi.getHinhAnh());
            bookCu.setTheLoai(bookMoi.getTheLoai());
            bookCu.setTenTacGia(bookMoi.getTenTacGia());
            bookCu.setNam(bookMoi.getNam());
            bookCu.setNxb(bookMoi.getNxb());
            bookCu.setGia(bookMoi.getGia());
            bookCu.setSoTrang(bookMoi.getSoTrang());
            bookCu.setTongSoLuong(newSoLuong);

            Book savedBook = bookRepo.save(bookCu);

            if (newSoLuong > oldSoLuong) {
                int soLuongThem = newSoLuong - oldSoLuong;
                List<ChildBook> childBooks = new ArrayList<>();
                for (int i = 0; i < soLuongThem; i++) {
                    ChildBook child = new ChildBook();
                    child.setIdParent(savedBook.getId());
                    child.setTrangThai(ChildBook.TrangThai.CON_SAN);
                    childBooks.add(child);
                }
                childBookRepo.saveAll(childBooks);
            }

            return savedBook;
        } else {
            return null;
        }
    }

    public void xoaBook(String id) {
        Optional<Book> optionalBook = bookRepo.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setTrangThai(Book.TrangThai.DA_XOA);
            bookRepo.save(book);
        }
    }

    // Tìm kiếm sách theo tên sách, tác giả hoặc thể loại
    public List<Book> searchBooks(String query) {
        // Kiểm tra nếu query không phải là null hoặc rỗng
        if (query == null || query.trim().isEmpty()) {
            return List.of(); // Trả về danh sách rỗng nếu không có input
        }

        // Tìm kiếm theo tên sách, tên tác giả hoặc thể loại (kiểm tra đầy đủ các trường
        // hợp)
        List<Book> books = bookRepo.findByTenSachContainingIgnoreCase(query);
        if (books.isEmpty()) {
            books = bookRepo.findByTenTacGiaContainingIgnoreCase(query);
        }
        if (books.isEmpty()) {
            books = bookRepo.findByTheLoaiContainingIgnoreCase(query);
        }

        return books;
    }

    public List<Book> getSuggestions(String userId, List<String> keywords) {
        // 1. Lấy 5 phiếu mượn gần nhất của user
        List<BorrowCard> recentBorrows = borrowCardRepo.findTop5ByUserIdOrderByBorrowDateDesc(userId);

        // 2. Lấy tất cả bookIds đã mượn trong 5 phiếu mượn (id kiểu String)
        List<String> allBorrowedBookIds = recentBorrows.stream()
                .map(BorrowCard::getBookIds) // List<String>
                .flatMap(Collection::stream)
                .distinct()
                .collect(Collectors.toList());

        if (allBorrowedBookIds.isEmpty()) {
            // Nếu chưa mượn sách nào, chỉ lọc theo keywords
            return bookRepo.findAll().stream()
                    .filter(book -> keywords.stream()
                            .anyMatch(kw -> book.getTenSach().toLowerCase().contains(kw.toLowerCase()) ||
                                    book.getTenTacGia().toLowerCase().contains(kw.toLowerCase())))
                    .limit(10)
                    .collect(Collectors.toList());
        }

        // 3. Lấy thông tin sách đã mượn
        List<Book> borrowedBooks = bookRepo.findAllById(allBorrowedBookIds);

        // 4. Tạo set id sách đã mượn để loại ra
        Set<String> borrowedBookIdSet = borrowedBooks.stream()
                .map(Book::getId)
                .collect(Collectors.toSet());

        // 5. Lấy danh sách tác giả của sách đã mượn, gộp với keywords
        List<String> authors = borrowedBooks.stream()
                .map(Book::getTenTacGia)
                .distinct()
                .collect(Collectors.toList());

        List<String> allKeywords = new ArrayList<>(keywords);
        allKeywords.addAll(authors);

        System.out.println("All Keywords: " + allKeywords);
        System.out.println("Borrowed Book IDs: " + borrowedBookIdSet);
        // System.out.println("All Books count: " + allBooks.size());

        // 6. Lọc sách chưa mượn, tên hoặc tác giả chứa keyword, trả về tối đa 10 quyển
        return bookRepo.findAll().stream()
                .filter(book -> !borrowedBookIdSet.contains(book.getId()))
                .filter(book -> allKeywords.stream()
                        .anyMatch(kw -> book.getTenSach().toLowerCase().contains(kw.toLowerCase()) ||
                                book.getTenTacGia().toLowerCase().contains(kw.toLowerCase()) ||
                                book.getTheLoai().toLowerCase().contains(kw.toLowerCase()) ||
                                book.getMoTa().toLowerCase().contains(kw.toLowerCase())))
                .limit(10)
                .collect(Collectors.toList());
    }

    public List<Book> getNewestBooks() {
        return bookRepo.findTop10ByTrangThaiOrderByNgayTaoDesc(Book.TrangThai.CON_SAN);
    }
}
