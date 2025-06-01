package com.library_web.library.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.Cart;
import com.library_web.library.Model.User;
import com.library_web.library.Repository.CartRepo;
import com.library_web.library.Repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CartRepo cartRepository;
    @Autowired
    private NotificationService notificationService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User signUp(User user) {
        user.setMatKhau(passwordEncoder.encode(user.getMatKhau())); // Mã hóa mật khẩu
        // Gán avatar mặc định nếu chưa chọn
        if (user.getAvatarUrl() == null || user.getAvatarUrl().isBlank()) {
            user.setAvatarUrl("https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482760jWL/anh-mo-ta.png");
        }

        User savedUser = userRepo.save(user);
        // Tạo giỏ hàng mới cho người dùng
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cart.setBooks(new ArrayList<>());
        cartRepository.save(cart);

        // Gửi thông báo chào mừng đến người dùng
        String message = "Chào mừng " + user.getTenND() + " đã đăng ký tài khoản thành công!";
        notificationService.sendNotification(user.getId(), message); // Gửi thông báo

        return savedUser;
    }

    // Đăng nhập người dùng và kiểm tra mật khẩu
    public User signIn(String email, String rawPassword) throws AuthenticationException {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(rawPassword, user.getMatKhau())) {
                return user;
            } else {
                throw new org.springframework.security.authentication.BadCredentialsException("Invalid password");
            }
        } else {
            throw new org.springframework.security.authentication.BadCredentialsException("User not found");
        }
    }

    public User changePassword(String userId, String oldPassword, String newPassword) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Kiểm tra mật khẩu cũ có đúng không
        if (!passwordEncoder.matches(oldPassword, user.getMatKhau())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        // Mã hóa mật khẩu mới
        user.setMatKhau(passwordEncoder.encode(newPassword));

        // Lưu lại người dùng
        return userRepo.save(user);
    }

    public void deleteUserById(String userId) {
        // Kiểm tra xem user có tồn tại không
        if (!userRepo.existsById(userId)) {
            throw new RuntimeException("Người dùng không tồn tại");
        }
        // Xóa giỏ hàng liên quan
        cartRepository.deleteByUserId(userId);
        // Nếu có, xóa user
        userRepo.deleteById(userId);
    }

    public User themUser(User userMoi) {
        // Gán ngày tạo nếu chưa có
        if (userMoi.getNgayTao() == null) {
            userMoi.setNgayTao(LocalDateTime.now());
        }

        // Gán avatar mặc định nếu chưa chọn
        if (userMoi.getAvatarUrl() == null || userMoi.getAvatarUrl().isBlank()) {
            userMoi.setAvatarUrl("https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482760jWL/anh-mo-ta.png");
        }

        return userRepo.save(userMoi);
    }

}
