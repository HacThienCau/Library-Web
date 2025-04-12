package com.library_web.library.Controller;

import com.library_web.library.Model.User;
import com.library_web.library.Respository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;

    // Thêm người dùng mới
    @PostMapping("/addUser")
    public User themUser(@RequestBody User user) {
        // Khởi tạo ngày tạo người dùng
        user.khoiTaoNgayTao();
        return userRepo.save(user);
    }

    // Lấy tất cả người dùng
    @GetMapping("/users")
    public List<User> layTatCaUser() {
        return userRepo.findAll();
    }

    // Lấy người dùng theo ID
    @GetMapping("/user/{id}")
    public User layUserTheoId(@PathVariable String id) {
        return userRepo.findById(id).orElse(null);
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/user/{id}")
    public User capNhatUser(@PathVariable String id, @RequestBody User userMoi) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User userCu = optionalUser.get();
            
            // Cập nhật các thông tin người dùng nếu có thay đổi
            if (userMoi.getTenND() != null) userCu.setTenND(userMoi.getTenND());
            if (userMoi.getEmail() != null) userCu.setEmail(userMoi.getEmail());
            if (userMoi.getMatKhau() != null) userCu.setMatKhau(userMoi.getMatKhau());
            if (userMoi.getNgaySinh() != null) userCu.setNgaySinh(userMoi.getNgaySinh());
            if (userMoi.getGioiTinh() != null) userCu.setGioiTinh(userMoi.getGioiTinh());

            return userRepo.save(userCu);
        } else {
            return null;
        }
    }

    // Xóa người dùng
    @DeleteMapping("/user/{id}")
    public void xoaUser(@PathVariable String id) {
        userRepo.deleteById(id);
    }
}
