package com.library_web.library.Controller;

import com.library_web.library.Repository.UserRepo;
import com.library_web.library.Model.Book;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.FineRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private BorrowCardRepo borrowCardRepo;

    @Autowired
    private FineRepo fineRepo;

    // API lấy tổng số liệu thống kê
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalBooks", bookRepo.count());
        stats.put("totalBorrowCards", borrowCardRepo.count());
        stats.put("totalFineCards", fineRepo.count()); // assuming fines repo
        return stats;
    }

    @GetMapping("/top-books")
    public List<Book> getTopBooks() {
        // Giả sử BookRepo có phương thức findTop3ByOrderBySoLuongMuonDesc()
        return bookRepo.findTop3ByOrderBySoLuongMuonDesc();
    }

    @GetMapping("/books-import")
    public List<Map<String, Object>> getBooksImportData() {
        return bookRepo.getBooksImportStatsByMonth();
    }
}
