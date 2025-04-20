package com.library_web.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()                // Tắt CSRF cho REST APIs
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()    // Cho phép tất cả các request
            )
            .formLogin().disable()           // Tắt login form mặc định
            .httpBasic().disable();          // Tắt basic auth

        return http.build();
    }
}
