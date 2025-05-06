package com.library_web.library.Controller;

import com.library_web.library.Model.ChildBook;
import com.library_web.library.Service.ChildBookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
public class ChildBookController {

    @Autowired
    private ChildBookService childBookService;

    @PostMapping("/addChild")
    public ChildBook themChild(@RequestBody ChildBook childBook) {
        return childBookService.themChild(childBook);
    }

    @GetMapping("/childrenOf/{idParent}")
    public List<ChildBook> getChildBooksByParentId(@PathVariable String idParent) {
        return childBookService.getChildBooksByParentId(idParent);
    }

    @GetMapping("/child/{id}")
    public ChildBook layBookTheoId(@PathVariable String id) {
        return childBookService.layBookTheoId(id);
    }

    @PutMapping("/child/{id}")
    public ChildBook capNhatBook(@PathVariable String id, @RequestBody ChildBook.TrangThai status) {
        return childBookService.capNhatBook(id, status);
    }

    @GetMapping("/childNParent/{id}")
    public ResponseEntity<?> getChildAndParent(@PathVariable String id) {
        Map<String, Object> result = childBookService.getChildAndParent(id);
        return ResponseEntity.ok(result);
    }
    
}
