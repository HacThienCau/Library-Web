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
        List<String> keywords = (List<String>) requestBody.get("keywords");

        // Nếu có userId và không rỗng thì gợi ý cá nhân hóa
        Object userIdObj = requestBody.get("userId");

        if (userIdObj != null && userIdObj instanceof String userId && !userId.trim().isEmpty()) {
            return bookService.getPersonalizedSuggestions(userId, keywords);
        }

        // Nếu không có userId thì gợi ý bình thường
        return bookService.getGeneralSuggestions(keywords);
    }

    @GetMapping("/books/top5")
    public List<Map<String, Object>> getTop5Books() {
        return bookService.layTop5Book();
    }

    @GetMapping("/books/newest")
    public List<Book> getNewestBooks() {
        return bookService.getNewestBooks();
    }

    @GetMapping("/books/most-borrowed")
    public List<Book> getMostBorrowedBooks() {
        return bookService.getMostBorrowedBooks();
    }

}
