package com.library_web.library.Repository;

import com.library_web.library.Model.BorrowCard;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BorrowCardRepo extends MongoRepository<BorrowCard, String> {
    // Tìm phiếu mượn theo ID người dùng
    List<BorrowCard> findByUserId(String userId); 
}
