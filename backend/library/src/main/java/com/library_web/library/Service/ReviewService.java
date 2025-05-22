package com.library_web.library.Service;

import com.library_web.library.Model.Review;
import com.library_web.library.Repository.ReviewRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReviewService {
    @Autowired
    private final ReviewRepo reviewRepo;


    public ReviewService(ReviewRepo reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }

    public List<Review> getReviewsByBookId(String bookId) {
        return reviewRepo.findByBookId(bookId);
    }

    public Review getReviewById(String id) {
        return reviewRepo.findById(id).orElse(null);
    }

    public Review addReview(Review review) {
        return reviewRepo.save(review);
    }

    public Review updateReview(String id, Review updatedReview) {
        return reviewRepo.findById(id)
            .map(existing -> {
                existing.setComment(updatedReview.getComment());
                existing.setRating(updatedReview.getRating());
                existing.setBookId(updatedReview.getBookId());
                existing.setUserId(updatedReview.getUserId());
                return reviewRepo.save(existing);
            })
            .orElse(null);
    }

    public void deleteReview(String id) {
        reviewRepo.deleteById(id);
    }
}
