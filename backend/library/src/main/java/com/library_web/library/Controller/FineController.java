package com.library_web.library.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library_web.library.Model.Fine;
import com.library_web.library.Service.FineService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



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
    
    @GetMapping("/fine/{id}")
    public Map<String, Object> getById(@PathVariable String id) {
        return fineService.getById(id);
    }
    
    @PutMapping("/fine/pay/{id}")
    public ResponseEntity<?> thanhToan(@PathVariable String id) {
        String result = fineService.thanhToan(id);
        return result!="ok"?ResponseEntity.ok(result):ResponseEntity.badRequest().body(result);
    }
}
