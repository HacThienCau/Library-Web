package com.library_web.library.Controller;

import com.library_web.library.DTO.ChangePasswordRequest;
import com.library_web.library.DTO.SignInRequest;
import com.library_web.library.DTO.UserDetail;
import com.library_web.library.Model.User;
import com.library_web.library.Repository.UserRepo;
import com.library_web.library.Service.BorrowCardService;
import com.library_web.library.Service.UserService;
import com.library_web.library.Utils.JWTUtils;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserService userService;

    // Thêm người dùng mới
    // @PostMapping("/addUser")
    // public User themUser(@RequestBody User user) {
    // // Khởi tạo ngày tạo người dùng
    // user.khoiTaoNgayTao();
    // return userRepo.save(user);
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
            e.printStackTrace(); // In stack trace để xem chi tiết lỗi
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }

    // Lấy tất cả người dùng
    @GetMapping("/users")
    public List<User> layTatCaUser() {
        return userRepo.findAll();
    }

    @Autowired
    private BorrowCardService borrowCardService;

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserWithBorrowStats(@PathVariable String id) {
        Optional<User> userOpt = userRepo.findById(id);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(404).body("Người dùng không tồn tại");
        }

        User user = userOpt.get();

        UserDetail detail = new UserDetail();
        detail.setId(user.getId());
        detail.setTenND(user.getTenND());
        detail.setEmail(user.getEmail());
        detail.setMatKhau(user.getMatKhau());
        detail.setNgaySinh(user.getNgaySinh().toString());
        detail.setGioiTinh(user.getGioiTinh().toString());
        detail.setNgayTao(user.getNgayTao().toString());

        detail.setSoSachDangMuon(borrowCardService.countBooksBeingBorrowed(id));
        detail.setSoSachQuaHan(borrowCardService.countBooksOverdue(id));

        return ResponseEntity.ok(detail);
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/user/{id}")
    public ResponseEntity<?> capNhatUser(@PathVariable String id, @RequestBody User userMoi) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User userCu = optionalUser.get();

            // Cập nhật các thông tin được cho phép
            if (userMoi.getTenND() != null && !userMoi.getTenND().isBlank())
                userCu.setTenND(userMoi.getTenND());

            if (userMoi.getNgaySinh() != null)
                userCu.setNgaySinh(userMoi.getNgaySinh());

            userRepo.save(userCu);
            return ResponseEntity.ok(userCu);
        } else {
            return ResponseEntity.status(404).body("Người dùng không tồn tại");
        }
    }

    // // Xóa người dùng
    // @DeleteMapping("/user/{id}")
    // public void xoaUser(@PathVariable String id) {
    // userRepo.deleteById(id);
    // }

    // Đổi mật khẩu
    @PutMapping("/user/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable String id, @RequestBody ChangePasswordRequest request) {
        try {
            User updatedUser = userService.changePassword(id, request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi server");
        }
    }
}
