package com.library_web.library.Controller;

import com.library_web.library.Model.Book;
import com.library_web.library.Service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String query) {
        List<Book> books = bookService.searchBooks(query);
        return books.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(books);
    }

    @PostMapping("/suggest")
    public List<Book> suggestBooks(@RequestBody Map<String, Object> requestBody) {
        String userId = (requestBody.get("userId").toString());

        // Ép kiểu cho danh sách từ khóa
        List<String> keywords = (List<String>) requestBody.get("keywords");

        return bookService.getSuggestions(userId, keywords);
    }
}
