package com.library_web.library.Controller;


import com.library_web.library.DTO.SignInRequest;
import com.library_web.library.Model.User;
import com.library_web.library.Respository.UserRepo;
import com.library_web.library.Service.UserService;
import com.library_web.library.Utils.JWTUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class UserController {

     @Autowired
     private UserRepo userRepo;
    @Autowired
    private  UserService userService;

    // Thêm người dùng mới
    // @PostMapping("/addUser")
    // public User themUser(@RequestBody User user) {
    //     // Khởi tạo ngày tạo người dùng
    //     user.khoiTaoNgayTao();
    //     return userRepo.save(user);
    // }

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        user.khoiTaoNgayTao();
        return ResponseEntity.ok(userService.signUp(user));
    }

    // Đăng nhập người dùng và trả về JWT token và thông tin người dùng
    @PostMapping("/signin")
public ResponseEntity<?> signIn(@RequestBody SignInRequest loginRequest) {
    try {
        User user = userService.signIn(loginRequest.getEmail(), loginRequest.getMatKhau());
        String token = JWTUtils.generateToken(user.getId());
        return ResponseEntity.ok(new Object() {
            public final String jwt = token;
            public final String email = user.getEmail();
            public final String tenND = user.getTenND();
            public final String id = user.getId();
            public final String gioiTinh = user.getGioiTinh().toString();
            public final String ngaySinh = user.getNgaySinh().toString();
        });
    } catch (Exception e) {
        e.printStackTrace();  // In stack trace để xem chi tiết lỗi
        return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
}

    // Lấy tất cả người dùng
    // @GetMapping("/users")
    // public List<User> layTatCaUser() {
    //     return userRepo.findAll();
    // }

    // Lấy người dùng theo ID
     @GetMapping("/user/{id}")
     public User layUserTheoId(@PathVariable String id) {
         return userRepo.findById(id).orElse(null);
     }

    // // Cập nhật thông tin người dùng
    // @PutMapping("/user/{id}")
    // public User capNhatUser(@PathVariable String id, @RequestBody User userMoi) {
    //     Optional<User> optionalUser = userRepo.findById(id);
    //     if (optionalUser.isPresent()) {
    //         User userCu = optionalUser.get();
            
    //         // Cập nhật các thông tin người dùng nếu có thay đổi
    //         if (userMoi.getTenND() != null) userCu.setTenND(userMoi.getTenND());
    //         if (userMoi.getEmail() != null) userCu.setEmail(userMoi.getEmail());
    //         if (userMoi.getMatKhau() != null) userCu.setMatKhau(userMoi.getMatKhau());
    //         if (userMoi.getNgaySinh() != null) userCu.setNgaySinh(userMoi.getNgaySinh());
    //         if (userMoi.getGioiTinh() != null) userCu.setGioiTinh(userMoi.getGioiTinh());

    //         return userRepo.save(userCu);
    //     } else {
    //         return null;
    //     }
    // }

    // // Xóa người dùng
    // @DeleteMapping("/user/{id}")
    // public void xoaUser(@PathVariable String id) {
    //     userRepo.deleteById(id);
    // }
}
