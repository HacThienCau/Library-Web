package com.library_web.library.Repository;

import com.library_web.library.Model.Cart;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends MongoRepository<Cart, String> {
  Optional<Cart> findByUser_Id(String userId);
}
