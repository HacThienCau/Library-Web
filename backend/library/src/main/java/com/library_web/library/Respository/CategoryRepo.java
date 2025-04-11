package com.library_web.library.Respository;

import com.library_web.library.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends MongoRepository<Category, String> {
  boolean existsByTenTheLoaiChaAndTenTheLoaiCon(String tenTheLoaiCha, String tenTheLoaiCon);
}
