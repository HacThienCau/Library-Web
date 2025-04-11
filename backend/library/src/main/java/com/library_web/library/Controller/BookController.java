package com.library_web.library.Controller;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Respository.BookRepo;
import com.library_web.library.Respository.ChildBookRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    @Autowired
    BookRepo BookRepo;
    @Autowired
    ChildBookRepo ChildBookRepo;

    @PostMapping("/addBook")
    public Book themBook(@RequestBody Book book) {
        Book savedBook = BookRepo.save(book);
        savedBook.setTrangThai(Book.TrangThai.CON_SAN);
    // Tạo danh sách ChildBook tương ứng với tongSoLuong
    List<ChildBook> childBooks = new ArrayList<>();
    for (int i = 0; i < book.getTongSoLuong(); i++) {
        ChildBook child = new ChildBook();
        child.setIdParent(savedBook.getId()); 
        child.setTrangThai(ChildBook.TrangThai.CON_SAN);
        childBooks.add(child);
    }
    ChildBookRepo.saveAll(childBooks);

    return savedBook;
    }

    // Lấy tất cả sách còn sẵn
    @GetMapping("/books")
    public List<Book> layTatCaBook() {
        return BookRepo.findByTrangThai(Book.TrangThai.CON_SAN);
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
            int oldSoLuong = BookCu.getTongSoLuong();
            int newSoLuong = BookMoi.getTongSoLuong();
            // Cập nhật các thông tin khác
            BookCu.setTenSach(BookMoi.getTenSach());
            BookCu.setMoTa(BookMoi.getMoTa());
            BookCu.setHinhAnh(BookMoi.getHinhAnh());
            BookCu.setTheLoai(BookMoi.getTheLoai());
            BookCu.setTenTacGia(BookMoi.getTenTacGia());
            BookCu.setNam(BookMoi.getNam());
            BookCu.setNxb(BookMoi.getNxb());
            BookCu.setTongSoLuong(newSoLuong);

            Book savedBook = BookRepo.save(BookCu);
            if (newSoLuong > oldSoLuong) {
                int soLuongThem = newSoLuong - oldSoLuong;
                List<ChildBook> childBooks = new ArrayList<>();
                for (int i = 0; i < soLuongThem; i++) {
                    ChildBook child = new ChildBook();
                    child.setIdParent(savedBook.getId());
                    child.setTrangThai(ChildBook.TrangThai.CON_SAN);
                    childBooks.add(child);
                }
                ChildBookRepo.saveAll(childBooks);
            }
            return savedBook;
        } else {
            return null;
        }
        
    }

    // Xóa sách
    @DeleteMapping("/book/{id}")
    public void xoaBook(@PathVariable String id) {
        Optional<Book> optionalBook = BookRepo.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setTrangThai(Book.TrangThai.DA_XOA);
            BookRepo.save(book);
        } else {
           System.out.println("Không tìm thấy sách");
        }
    }
}
