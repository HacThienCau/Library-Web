package com.library_web.library.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**") // cho tất cả route
                        .allowedOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002") // chấp nhận từ React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH" , "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // nếu bạn dùng cookie / auth header
            }
        };
    }
}