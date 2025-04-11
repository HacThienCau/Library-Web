package com.library_web.library.Respository;

import com.library_web.library.Model.Sach;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SachRepo extends MongoRepository<Sach, String> {

}
