package com.library_web.library.Controller;

import com.library_web.library.Model.Book;
import com.library_web.library.Service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
public class BookController {

    @Autowired
    private BookService bookService;
    @PostMapping("/addBook")
    public Book themBook(@RequestBody Book book) {
        return bookService.themBook(book);
    }

    @GetMapping("/books")
    public List<Map<String, Object>> layTatCaBook() {
        return bookService.layTatCaBook();
    }

    @GetMapping("/book/{id}")
    public Map<String, Object> layBookTheoId(@PathVariable String id) {
        return bookService.layBookTheoId(id);
    }

    @PutMapping("/book/{id}")
    public Book capNhatBook(@PathVariable String id, @RequestBody Book bookMoi) {
        return bookService.capNhatBook(id, bookMoi);
    }

    @DeleteMapping("/book/{id}")
    public void xoaBook(@PathVariable String id) {
        bookService.xoaBook(id);
    }
}
