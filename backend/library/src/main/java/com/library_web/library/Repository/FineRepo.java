package com.library_web.library.Repository;

import com.library_web.library.Model.Fine;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FineRepo extends MongoRepository<Fine, String> {
    List<Fine> findByUserId(String userId);
    Optional<Fine> findByOrderId(String orderId);
    long countByNgayTaoBetween(LocalDateTime start, LocalDateTime end);
}
