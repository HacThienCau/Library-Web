package com.library_web.library.Repository;

import com.library_web.library.Model.ChildBook;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildBookRepo extends MongoRepository<ChildBook, String> {
    List<ChildBook> findByIdParent(String idParent);
}
