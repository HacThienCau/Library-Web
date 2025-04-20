package com.library_web.library.Service;

import com.library_web.library.Model.Book;
import com.library_web.library.Model.Category;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Respository.BookRepo;
import com.library_web.library.Respository.CategoryRepo;
import com.library_web.library.Respository.ChildBookRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService {

    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private ChildBookRepo childBookRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    public Book themBook(Book book) {
        book.setTrangThai(Book.TrangThai.CON_SAN);
        Book savedBook = bookRepo.save(book);

        List<ChildBook> childBooks = new ArrayList<>();
        for (int i = 0; i < book.getTongSoLuong(); i++) {
            ChildBook child = new ChildBook();
            child.setIdParent(savedBook.getId());
            child.setTrangThai(ChildBook.TrangThai.CON_SAN);
            childBooks.add(child);
        }
        childBookRepo.saveAll(childBooks);

        return savedBook;
    }

    public List<Map<String, Object>> layTatCaBook() {
        List<Book> books = bookRepo.findByTrangThai(Book.TrangThai.CON_SAN);
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Book book : books) {
            Category cate = categoryRepo.findById(book.getTheLoai()).orElse(null);
    
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("id", book.getId());
            resultMap.put("tenSach", book.getTenSach());
            resultMap.put("moTa", book.getMoTa());
            resultMap.put("hinhAnh", book.getHinhAnh());
            resultMap.put("theLoai", book.getTheLoai());
            resultMap.put("tenTacGia", book.getTenTacGia());
            resultMap.put("nxb", book.getNxb());
            resultMap.put("nam", book.getNam());
            resultMap.put("tongSoLuong", book.getTongSoLuong());
            resultMap.put("soLuongMuon", book.getSoLuongMuon());
            resultMap.put("soLuongXoa", book.getSoLuongXoa());
            resultMap.put("trangThai", book.getTrangThai());
    
            if (cate != null) {
                resultMap.put("tenTheLoaiCha", cate.getTenTheLoaiCha());
                resultMap.put("tenTheLoaiCon", cate.getTenTheLoaiCon());
                resultMap.put("viTri", cate.getViTri());
            } else {
                resultMap.put("tenTheLoaiCha", null);
                resultMap.put("tenTheLoaiCon", null);
                resultMap.put("viTri", null);
            }
    
            resultList.add(resultMap);
        }
    
        return resultList;
    }

    public Map<String, Object> layBookTheoId(String id) {
        Book book = bookRepo.findById(id).orElse(null);
        Category cate = categoryRepo.findById(book.getTheLoai()).orElse(null);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", book.getId());
        resultMap.put("tenSach", book.getTenSach());
        resultMap.put("moTa", book.getMoTa());
        resultMap.put("hinhAnh", book.getHinhAnh());
        resultMap.put("theLoai", book.getTheLoai());
        resultMap.put("tenTacGia", book.getTenTacGia());
        resultMap.put("nxb", book.getNxb());
        resultMap.put("nam", book.getNam());
        resultMap.put("tongSoLuong", book.getTongSoLuong());
        resultMap.put("soLuongMuon", book.getSoLuongMuon());
        resultMap.put("soLuongXoa", book.getSoLuongXoa());
        resultMap.put("trangThai", book.getTrangThai());
        resultMap.put("tenTheLoaiCha", cate.getTenTheLoaiCha());
        resultMap.put("tenTheLoaiCon", cate.getTenTheLoaiCon());
        resultMap.put("viTri", cate.getViTri());

        return resultMap;
    }

    public Book capNhatBook(String id, Book bookMoi) {
        Optional<Book> optionalBook = bookRepo.findById(id);
        if (optionalBook.isPresent()) {
            Book bookCu = optionalBook.get();
            int oldSoLuong = bookCu.getTongSoLuong();
            int newSoLuong = bookMoi.getTongSoLuong();

            bookCu.setTenSach(bookMoi.getTenSach());
            bookCu.setMoTa(bookMoi.getMoTa());
            bookCu.setHinhAnh(bookMoi.getHinhAnh());
            bookCu.setTheLoai(bookMoi.getTheLoai());
            bookCu.setTenTacGia(bookMoi.getTenTacGia());
            bookCu.setNam(bookMoi.getNam());
            bookCu.setNxb(bookMoi.getNxb());
            bookCu.setTongSoLuong(newSoLuong);

            Book savedBook = bookRepo.save(bookCu);

            if (newSoLuong > oldSoLuong) {
                int soLuongThem = newSoLuong - oldSoLuong;
                List<ChildBook> childBooks = new ArrayList<>();
                for (int i = 0; i < soLuongThem; i++) {
                    ChildBook child = new ChildBook();
                    child.setIdParent(savedBook.getId());
                    child.setTrangThai(ChildBook.TrangThai.CON_SAN);
                    childBooks.add(child);
                }
                childBookRepo.saveAll(childBooks);
            }

            return savedBook;
        } else {
            return null;
        }
    }

    public void xoaBook(String id) {
        Optional<Book> optionalBook = bookRepo.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setTrangThai(Book.TrangThai.DA_XOA);
            bookRepo.save(book);
        }
    }
}