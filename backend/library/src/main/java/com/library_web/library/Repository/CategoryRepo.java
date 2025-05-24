package com.library_web.library.Repository;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.Category;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends MongoRepository<Category, String> {
  boolean existsByTenTheLoaiChaAndTenTheLoaiCon(String tenTheLoaiCha, String tenTheLoaiCon);

  Optional<Category> findByTenTheLoaiCon(String tenTheLoaiCon);
}