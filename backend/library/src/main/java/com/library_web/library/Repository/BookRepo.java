package com.library_web.library.Repository;

import com.library_web.library.Model.Book;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {
    List<Book> findByTrangThai(Book.TrangThai status);
}
