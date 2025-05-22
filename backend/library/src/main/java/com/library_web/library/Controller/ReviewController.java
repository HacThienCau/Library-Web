package com.library_web.library.Controller;

import com.library_web.library.Model.Review;
import com.library_web.library.Service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
  @Autowired
  private final ReviewService reviewService;

  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  // Lấy tất cả đánh giá
  @GetMapping
  public List<Review> getAllReviews() {
    return reviewService.getAllReviews();
  }

  // Lấy đánh giá theo mã sách
  @GetMapping("/book/{bookId}")
  public List<Review> getReviewsByBookId(@PathVariable String bookId) {
    return reviewService.getReviewsByBookId(bookId);
  }

  // 🔍 Lấy đánh giá theo ID
  @GetMapping("/{id}")
  public ResponseEntity<Review> getReviewById(@PathVariable String id) {
    Review review = reviewService.getReviewById(id);
    return review != null ? ResponseEntity.ok(review) : ResponseEntity.notFound().build();
  }

  // Thêm mới đánh giá
  @PostMapping
  public ResponseEntity<Review> addReview(@RequestBody Review review) {
    Review saved = reviewService.addReview(review);
    return ResponseEntity.ok(saved);
  }

  // Cập nhật đánh giá
  @PutMapping("/{id}")
  public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Review review) {
    Review updated = reviewService.updateReview(id, review);
    return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
  }

  // Xoá đánh giá
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteReview(@PathVariable String id) {
    reviewService.deleteReview(id);
    return ResponseEntity.noContent().build();
  }
}
