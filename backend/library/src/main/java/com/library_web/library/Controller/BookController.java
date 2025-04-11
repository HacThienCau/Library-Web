package com.library_web.library.Controller;

import com.library_web.library.Model.Book;
import com.library_web.library.Respository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    @Autowired
    BookRepo BookRepo;

    @PostMapping("/addBook")
    public Book themBook(@RequestBody Book Book) {
        return BookRepo.save(Book);
    }

    // Lấy tất cả sách
    @GetMapping("/books")
    public List<Book> layTatCaBook() {
        return BookRepo.findAll();
    }

    // Lấy sách theo ID
    @GetMapping("/book/{id}")
    public Book layBookTheoId(@PathVariable String id) {
        return BookRepo.findById(id).orElse(null);
    }

    // Cập nhật sách
    @PutMapping("/book/{id}")
    public Book capNhatBook(@PathVariable String id, @RequestBody Book BookMoi) {
        Optional<Book> optionalBook = BookRepo.findById(id);
        if (optionalBook.isPresent()) {
            Book BookCu = optionalBook.get();

            // Chỉ cập nhật nếu giá trị mới khác null
            if (BookMoi.getTenSach() != null) BookCu.setTenSach(BookMoi.getTenSach());
            if (BookMoi.getMoTa() != null) BookCu.setMoTa(BookMoi.getMoTa());
            if (BookMoi.getHinhAnh() != null) BookCu.setHinhAnh(BookMoi.getHinhAnh());
            if (BookMoi.getTheLoai() != null) BookCu.setTheLoai(BookMoi.getTheLoai());
            if (BookMoi.getTenTacGia() != null) BookCu.setTenTacGia(BookMoi.getTenTacGia());
            if (BookMoi.getTongSoLuong() != null) BookCu.setTongSoLuong(BookMoi.getTongSoLuong());
            if (BookMoi.getSoLuongMuon() != null) BookCu.setSoLuongMuon(BookMoi.getSoLuongMuon());

            return BookRepo.save(BookCu);
        } else {
            return null;
        }
        
    }

    // Xóa sách
    @DeleteMapping("/book/{id}")
    public void xoaBook(@PathVariable String id) {
        BookRepo.deleteById(id);
    }
}
