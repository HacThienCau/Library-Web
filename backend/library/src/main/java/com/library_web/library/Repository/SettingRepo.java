package com.library_web.library.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.library_web.library.Model.Setting;

@Repository
public interface SettingRepo extends MongoRepository<Setting, String> {}