package com.library_web.library.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.Fine;
import com.library_web.library.Repository.FineRepo;

@Service
public class FineService {

    @Autowired
    private FineRepo fineRepo;

    public Fine addFine(Fine fine){
        fine.setTrangThai(Fine.TrangThai.CHUA_THANH_TOAN);
        return fineRepo.save(fine);
    }

    public List<Fine> getAllFines(){
        return fineRepo.findAll();
    }
}
