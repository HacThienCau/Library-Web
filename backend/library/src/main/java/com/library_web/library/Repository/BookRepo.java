package com.library_web.library.Repository;

import com.library_web.library.Model.Book;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.domain.Pageable;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {
    List<Book> findByTrangThai(Book.TrangThai status);

    Page<Book> findAll(Pageable pageable);
    
    List<Book> findByTenSachContainingIgnoreCase(String tenSach);

    List<Book> findByTenTacGiaContainingIgnoreCase(String tenTacGia);

    List<Book> findByTheLoaiContainingIgnoreCase(String theLoai);

    List<Book> findByTheLoai(String theLoai);

    List <Book> findByTheLoai(List<String> theLoai);
    List<Book> findByTheLoaiIn(List<String> theLoai);

    // Mới nhất: sắp xếp theo năm giảm dần
    List<Book> findByTheLoaiOrderByNamDesc(String theLoai);

    // Mượn nhiều nhất
    List<Book> findByTheLoaiOrderBySoLuongMuonDesc(String theLoai);

    // (Nếu có thêm đánh giá)
    // List<Book> findByTheLoaiOrderByDanhGiaTrungBinhDesc(String theLoai);
    @Aggregation(pipeline = {
        "{ '$group': { " +
            " '_id': { $dateToString: { format: '%Y-%m', date: '$ngayTao' } }, " + 
            " 'count': { $sum: 1 } " +
        "} }",
        "{ '$sort': { '_id': 1 } }"
    })
    List<Map<String, Object>> getBooksImportStatsByMonth();
    long countByNgayTaoBetween(LocalDateTime start, LocalDateTime end);

    List<Book> findTop3ByOrderBySoLuongMuonDesc();
    List<Book> findTop10ByTrangThaiOrderByNgayTaoDesc(Book.TrangThai trangThai);
    List<Book> findTop10ByTrangThaiOrderBySoLuongMuonDesc(Book.TrangThai trangThai);
    List<Book> findAllByOrderByNgayTaoDesc();
    List<Book> findAllByOrderBySoLuongMuonDesc();
}
