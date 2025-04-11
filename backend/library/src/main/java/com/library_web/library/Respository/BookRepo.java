package com.library_web.library.Respository;

import com.library_web.library.Model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {

}
