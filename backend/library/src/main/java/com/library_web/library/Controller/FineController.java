package com.library_web.library.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.library_web.library.Model.Fine;
import com.library_web.library.Service.FineService;

@RestController
public class FineController {

    @Autowired
    private FineService fineService;

    @PostMapping("/addFine")
    public Fine addFine(@RequestBody Fine fine) {
        return fineService.addFine(fine);
    }

    @GetMapping("/fines")
    public List<Fine> getAllFines() {
        return fineService.getAllFines();
    }
    
}
