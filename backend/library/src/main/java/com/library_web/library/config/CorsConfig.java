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
                        .allowedOrigins("https://library-web-admin.vercel.app/", "https://library-web-readhub.vercel.app/", "https://library-web-scanner.vercel.app/") // chấp nhận từ React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH" , "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // nếu bạn dùng cookie / auth header
            }
        };
    }
}