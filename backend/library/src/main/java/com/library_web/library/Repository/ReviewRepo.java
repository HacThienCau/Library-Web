package com.library_web.library.Repository;

// Update the import below to match the actual package of Review
import com.library_web.library.Model.Review;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepo extends MongoRepository<Review, String> {
    List<Review> findByBookId(String bookId);
}