package com.library_web.library.Repository;

import com.library_web.library.Model.BorrowCard;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BorrowCardRepo extends MongoRepository<BorrowCard, String> {
    // Tìm phiếu mượn theo ID người dùng
    List<BorrowCard> findByUserId(String userId);
    List<BorrowCard> findTop5ByUserIdOrderByBorrowDateDesc(String userId);
    long countByBorrowDateBetween(LocalDateTime start, LocalDateTime end);
}
