package com.library_web.library.Controller;

import org.springframework.http.HttpStatus;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.Category;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.CategoryRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

  @Autowired
  CategoryRepo CategoryRepo;

  @Autowired
  BookRepo BookRepo;

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

  // Lấy thể loại theo ID
  @GetMapping("/category/{id}")
  public Category layBookTheoId(@PathVariable String id) {
    return CategoryRepo.findById(id).orElse(null);
  }

  @PutMapping("/books/categories/updateCategory/{id}")
  public ResponseEntity<?> capNhatCategory(@PathVariable String id, @RequestBody Category category) {
    try {
      Optional<Category> optional = CategoryRepo.findById(id);

      if (optional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body("❌ Không tìm thấy thể loại với ID: " + id);
      }

      Category old = optional.get();

      // Nếu tên thể loại con mới trùng trong cùng tên cha => không cho cập nhật
      boolean isExist = CategoryRepo.existsByTenTheLoaiChaAndTenTheLoaiCon(
          category.getTenTheLoaiCha(), category.getTenTheLoaiCon());

      if (isExist && !old.getTenTheLoaiCon().equals(category.getTenTheLoaiCon())) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body("❌ Thể loại con đã tồn tại trong thể loại cha này.");
      }

      // Cập nhật thông tin
      old.setTenTheLoaiCha(category.getTenTheLoaiCha());
      old.setTenTheLoaiCon(category.getTenTheLoaiCon());
      old.setViTri(category.getViTri());

      Category updated = CategoryRepo.save(old);
      return ResponseEntity.ok(updated);

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("⚠️ Lỗi cập nhật: " + e.getMessage());
    }
  }

  // Thấy thông tin
  @GetMapping("/books/categories/{tenTheLoaiCon}")
  public ResponseEntity<?> getCategoryByTenTheLoaiCon(@PathVariable String tenTheLoaiCon) {
    try {
      String decodedName = URLDecoder.decode(tenTheLoaiCon,
          StandardCharsets.UTF_8);
      Optional<Category> category = CategoryRepo.findByTenTheLoaiCon(decodedName);

      if (category.isPresent()) {
        return ResponseEntity.ok(category.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body("❌ Không tìm thấy thể loại con: " + tenTheLoaiCon);
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("⚠️ Lỗi khi lấy thể loại con: " + e.getMessage());
    }
  }

  // Lấy sách theo thể loại
  @GetMapping("/books/categories/id/{id}")
public ResponseEntity<?> getBooksByCategoryId(
    @PathVariable String id,
    @RequestParam(required = false, defaultValue = "all") String sort
) {
  try {
    List<Book> books;
    switch (sort) {
      case "newest":
        books = BookRepo.findByTheLoaiOrderByNamDesc(id);
        break;
      case "mostBorrowed":
        books = BookRepo.findByTheLoaiOrderBySoLuongMuonDesc(id);
        break;
      // Nếu chưa có trường đánh giá thì bỏ comment này
      // case "topRated":
      //   books = BookRepo.findByTheLoaiOrderByDanhGiaTrungBinhDesc(id);
      //   break;
      default:
        books = BookRepo.findByTheLoai(id);
        break;
    }

    return ResponseEntity.ok(books);
  } catch (Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("⚠️ Lỗi khi lấy sách theo thể loại: " + e.getMessage());
  }
}

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
