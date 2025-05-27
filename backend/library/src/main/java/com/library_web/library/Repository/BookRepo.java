package com.library_web.library.Repository;

import com.library_web.library.Model.Book;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Aggregation;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {
    List<Book> findByTrangThai(Book.TrangThai status);

    List<Book> findByTenSachContainingIgnoreCase(String tenSach);

    List<Book> findByTenTacGiaContainingIgnoreCase(String tenTacGia);

    List<Book> findByTheLoaiContainingIgnoreCase(String theLoai);

    List<Book> findByTheLoai(String theLoai);

    // Mới nhất: sắp xếp theo năm giảm dần
    List<Book> findByTheLoaiOrderByNamDesc(String theLoai);

    // Mượn nhiều nhất
    List<Book> findByTheLoaiOrderBySoLuongMuonDesc(String theLoai);

    // (Nếu có thêm đánh giá)
    // List<Book> findByTheLoaiOrderByDanhGiaTrungBinhDesc(String theLoai);
    @Aggregation(pipeline = {
        "{ '$group': { " +
            " '_id': { $dateToString: { format: '%Y-%m', date: '$timestamp' } }, " + 
            " 'count': { $sum: 1 } " +
        "} }",
        "{ '$sort': { '_id': 1 } }"
    })
    List<Map<String, Object>> getBooksImportStatsByMonth();

    List<Book> findTop3ByOrderBySoLuongMuonDesc();
}
