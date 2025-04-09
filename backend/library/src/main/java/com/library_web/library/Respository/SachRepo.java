package com.library_web.library.Respository;

import com.library_web.library.Model.Sach;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SachRepo extends MongoRepository<Sach, Integer> {

    // Lấy sách có maSach lớn nhất
    Optional<Sach> findTopByOrderByMaSachDesc();
}
