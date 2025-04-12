package com.library_web.library.Controller;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.Category;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Respository.BookRepo;
import com.library_web.library.Respository.CategoryRepo;
import com.library_web.library.Respository.ChildBookRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class BookController {

    @Autowired
    BookRepo BookRepo;
    @Autowired
    ChildBookRepo ChildBookRepo;
    @Autowired
    CategoryRepo CateRepo;

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
    public Map<String, Object> layBookTheoId(@PathVariable String id) {
        Book book = BookRepo.findById(id).orElse(null);        
        Category cate = CateRepo.findById(book.getTheLoai()).orElse(null);
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
                resultMap.put("trangThai", book.getMoTa());
                resultMap.put("tenTheLoaiCha", cate.getTenTheLoaiCha());
                resultMap.put("tenTheLoaiCon", cate.getTenTheLoaiCon());
                resultMap.put("viTri", cate.getViTri());
        return resultMap;
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
