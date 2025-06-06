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
    @GetMapping("/bookInBorrowing/{bookId}")
    public ResponseEntity<?> findBookInBorrowing(@PathVariable String bookId) {
        System.out.println("bookId: " + bookId);
        String BorrowCardId = childBookService.findBookInBorrowing(bookId);
        System.out.println("BorrowCardId: " + BorrowCardId);
        if(BorrowCardId.equalsIgnoreCase("Sách không có trong phiếu mượn")) {
            return ResponseEntity.status(404).body("Sách không có trong phiếu mượn");
        } else {
            return ResponseEntity.ok(BorrowCardId);
        }
    }

    @GetMapping("/bookInLost/{bookId}")
    public ResponseEntity<?> findBookInLost(@PathVariable String bookId) {
        System.out.println("bookId: " + bookId);
        String FineCardId = childBookService.findBookInLost(bookId);
        System.out.println("FineCardId: " + FineCardId);
        if(FineCardId.equalsIgnoreCase("Sách không có trong phiếu phạt")) {
            return ResponseEntity.status(404).body("Sách không có trong phiếu phạt");
        } else {
            return ResponseEntity.ok(FineCardId);
        }
    }
}
