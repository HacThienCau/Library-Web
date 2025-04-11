package com.library_web.library.Controller;

import org.springframework.http.HttpStatus;

import com.library_web.library.Model.Category;
import com.library_web.library.Respository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

  @Autowired
  CategoryRepo CategoryRepo;

  // Thêm danh mục
  @PostMapping("/addCategory")
  public ResponseEntity<?> themCategory(@RequestBody Category category) {
    try {
      boolean isExist = CategoryRepo.existsByTenTheLoaiChaAndTenTheLoaiCon(
        category.getTenTheLoaiCha(), category.getTenTheLoaiCon());

      if (isExist) {
        return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body("❌ Thể loại con đã tồn tại trong thể loại cha này.");
      }

      Category saved = CategoryRepo.save(category);
      return ResponseEntity.ok(saved);

    } catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("⚠️ Đã xảy ra lỗi khi thêm thể loại: " + e.getMessage());
    }
  }

  // Lấy tất cả thể loại
  @GetMapping("/books/categories")
  public List<Category> getAllCategories() {
    return CategoryRepo.findAll();
  }

  // // Lấy sách theo ID
  // @GetMapping("/book/{id}")
  // public Book layBookTheoId(@PathVariable String id) {
  // return BookRepo.findById(id).orElse(null);
  // }

  // // Cập nhật sách
  // @PutMapping("/book/{id}")
  // public Book capNhatBook(@PathVariable String id, @RequestBody Book BookMoi) {
  // Optional<Book> optionalBook = BookRepo.findById(id);
  // if (optionalBook.isPresent()) {
  // Book BookCu = optionalBook.get();

  // // Chỉ cập nhật nếu giá trị mới khác null
  // if (BookMoi.getTenSach() != null)
  // BookCu.setTenSach(BookMoi.getTenSach());
  // if (BookMoi.getMoTa() != null)
  // BookCu.setMoTa(BookMoi.getMoTa());
  // if (BookMoi.getHinhAnh() != null)
  // BookCu.setHinhAnh(BookMoi.getHinhAnh());
  // if (BookMoi.getTheLoai() != null)
  // BookCu.setTheLoai(BookMoi.getTheLoai());
  // if (BookMoi.getTenTacGia() != null)
  // BookCu.setTenTacGia(BookMoi.getTenTacGia());
  // if (BookMoi.getTongSoLuong() != null)
  // BookCu.setTongSoLuong(BookMoi.getTongSoLuong());
  // if (BookMoi.getSoLuongMuon() != null)
  // BookCu.setSoLuongMuon(BookMoi.getSoLuongMuon());

  // return BookRepo.save(BookCu);
  // } else {
  // return null;
  // }

  // }

  // // Xóa sách
  // @DeleteMapping("/book/{id}")
  // public void xoaBook(@PathVariable String id) {
  // BookRepo.deleteById(id);
  // }

}
