package com.library_web.library.Controller;

import com.library_web.library.Model.Sach;
import com.library_web.library.Respository.SachRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SachController {

    @Autowired
    SachRepo sachRepo;

    @PostMapping("/addBook")
    public Sach themSach(@RequestBody Sach sach) {
        // Lấy sách có mã cao nhất
        Optional<Sach> maxSach = sachRepo.findTopByOrderByMaSachDesc();

        // Tăng mã lên 1, nếu không có sách nào thì gán là 1
        int newMaSach = maxSach.map(s -> s.getMaSach() + 1).orElse(1);
        sach.setMaSach(newMaSach);

        return sachRepo.save(sach);
    }

    // Lấy tất cả sách
    @GetMapping("/books")
    public List<Sach> layTatCaSach() {
        return sachRepo.findAll();
    }

    // Lấy sách theo ID
    @GetMapping("/book/{id}")
    public Sach laySachTheoId(@PathVariable Integer id) {
        return sachRepo.findById(id).orElse(null);
    }

    // Cập nhật sách
    @PutMapping("/book/{id}")
    public Sach capNhatSach(@PathVariable Integer id, @RequestBody Sach sachMoi) {
        Optional<Sach> optionalSach = sachRepo.findById(id);
        if (optionalSach.isPresent()) {
            Sach sachCu = optionalSach.get();

            // Chỉ cập nhật nếu giá trị mới khác null
            if (sachMoi.getTenSach() != null) sachCu.setTenSach(sachMoi.getTenSach());
            if (sachMoi.getMoTa() != null) sachCu.setMoTa(sachMoi.getMoTa());
            if (sachMoi.getHinhAnh() != null) sachCu.setHinhAnh(sachMoi.getHinhAnh());
            if (sachMoi.getTheLoai() != null) sachCu.setTheLoai(sachMoi.getTheLoai());
            if (sachMoi.getTenTacGia() != null) sachCu.setTenTacGia(sachMoi.getTenTacGia());
            if (sachMoi.getSoLuongTon() != null) sachCu.setSoLuongTon(sachMoi.getSoLuongTon());
            if (sachMoi.getSoLuongMuon() != null) sachCu.setSoLuongMuon(sachMoi.getSoLuongMuon());

            return sachRepo.save(sachCu);
        } else {
            return null;
        }
        
    }

    // Xóa sách
    @DeleteMapping("/book/{id}")
    public void xoaSach(@PathVariable Integer id) {
        sachRepo.deleteById(id);
    }
}
