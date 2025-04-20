package com.library_web.library.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.User;
import com.library_web.library.Respository.UserRepo;

@Service
public class UserService {
    @Autowired   
private UserRepo userRepo;

 private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

 public User signUp(User user) {
    user.setMatKhau(passwordEncoder.encode(user.getMatKhau()));  // Mã hóa mật khẩu
    return userRepo.save(user);
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


} 
