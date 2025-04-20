package com.library_web.library.Respository;


import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.library_web.library.Model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email); // Tìm người dùng theo email
}
