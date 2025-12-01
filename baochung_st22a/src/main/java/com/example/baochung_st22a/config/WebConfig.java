package com.example.baochung_st22a.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String basePath;

        // 🔥 Nếu chạy trong Docker (EC2)
        if (new File("/app/uploads/").exists()) {
            basePath = "/app/uploads/";
        }
        // 🔥 Nếu chạy Local (Spring Boot chạy bằng IDE)
        else {
            basePath = System.getProperty("user.dir") + "/uploads/";
        }

        // =============================
        // 🖼 Product Images
        // =============================
        registry.addResourceHandler("/product_img/**")
                .addResourceLocations("file:" + basePath + "product_img/");

        // =============================
        // 🏷 Category Images
        // =============================
        registry.addResourceHandler("/category_img/**")
                .addResourceLocations("file:" + basePath + "category_img/");

        // =============================
        // 👤 Profile Images
        // =============================
        registry.addResourceHandler("/profile_img/**")
                .addResourceLocations("file:" + basePath + "profile_img/");
    }
}
