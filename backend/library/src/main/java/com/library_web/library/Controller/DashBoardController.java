package com.library_web.library.Controller;

import com.library_web.library.Repository.UserRepo;
import com.library_web.library.Model.Book;
import com.library_web.library.Repository.BookRepo;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.FineRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
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

        // Tổng hiện tại
        long totalUsers = userRepo.count();
        long totalBooks = bookRepo.count();
        long totalBorrowCards = borrowCardRepo.count();
        long totalFineCards = fineRepo.count();

        // Khai báo múi giờ VN
        ZoneId zoneVN = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime now = LocalDateTime.now(zoneVN);
        LocalDate today = now.toLocalDate();

        // Ngày đầu và cuối tháng trước
        LocalDate firstDayLastMonth = today.minusMonths(1).withDayOfMonth(1);
        LocalDate lastDayLastMonth = today.withDayOfMonth(1).minusDays(1);

        LocalDateTime startLastMonth = firstDayLastMonth.atStartOfDay();
        LocalDateTime endLastMonth = lastDayLastMonth.atTime(23, 59, 59);

        // Đầu tháng này và hiện tại
        LocalDateTime startThisMonth = today.withDayOfMonth(1).atStartOfDay();
        LocalDateTime endToday = now;

        // Thống kê tháng trước
        long lastMonthUsers = userRepo.countByNgayTaoBetween(startLastMonth, endLastMonth);
        long lastMonthBooks = bookRepo.countByNgayTaoBetween(startLastMonth, endLastMonth);
        long lastMonthBorrowCards = borrowCardRepo.countByBorrowDateBetween(startLastMonth, endLastMonth);
        long lastMonthFineCards = fineRepo.countByNgayTaoBetween(startLastMonth, endLastMonth);

        // Thống kê tháng này đến hiện tại
        long thisMonthUsers = userRepo.countByNgayTaoBetween(startThisMonth, endToday);
        long thisMonthBooks = bookRepo.countByNgayTaoBetween(startThisMonth, endToday);
        long thisMonthBorrowCards = borrowCardRepo.countByBorrowDateBetween(startThisMonth, endToday);
        long thisMonthFineCards = fineRepo.countByNgayTaoBetween(startThisMonth, endToday);

        // Đưa vào map
        stats.put("totalUsers", totalUsers);
        stats.put("totalBooks", totalBooks);
        stats.put("totalBorrowCards", totalBorrowCards);
        stats.put("totalFineCards", totalFineCards);

        stats.put("lastMonthUsers", lastMonthUsers);
        stats.put("lastMonthBooks", lastMonthBooks);
        stats.put("lastMonthBorrowCards", lastMonthBorrowCards);
        stats.put("lastMonthFineCards", lastMonthFineCards);

        stats.put("thisMonthUsers", thisMonthUsers);
        stats.put("thisMonthBooks", thisMonthBooks);
        stats.put("thisMonthBorrowCards", thisMonthBorrowCards);
        stats.put("thisMonthFineCards", thisMonthFineCards);

        return stats;
    }

    @GetMapping("/top-books")
    public List<Book> getTopBooks() {
        return bookRepo.findTop3ByOrderBySoLuongMuonDesc();
    }

    @GetMapping("/books-import")
    public List<Map<String, Object>> getBooksImportData() {
        List<Map<String, Object>> rawData = bookRepo.getBooksImportStatsByMonth();

        // Tạo map để tra cứu nhanh từ dữ liệu gốc
        Map<String, Integer> countMap = new HashMap<>();
        for (Map<String, Object> item : rawData) {
            countMap.put((String) item.get("_id"), ((Number) item.get("count")).intValue());
        }

        // Lấy 6 tháng gần nhất
        List<Map<String, Object>> result = new ArrayList<>();
        YearMonth currentMonth = YearMonth.now();
        for (int i = 5; i >= 0; i--) {
            YearMonth month = currentMonth.minusMonths(i);
            String key = month.toString();

            Map<String, Object> entry = new HashMap<>();
            entry.put("_id", key);
            entry.put("count", countMap.getOrDefault(key, 0));
            result.add(entry);
        }

        return result;
    }
}
