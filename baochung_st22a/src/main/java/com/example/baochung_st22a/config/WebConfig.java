package com.example.baochung_st22a.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // ĐƯỜNG DẪN ẢNH TRONG CONTAINER
        String basePath = "/app/uploads/";

        registry.addResourceHandler("/product_img/**")
                .addResourceLocations("file:" + basePath + "product_img/");

        registry.addResourceHandler("/category_img/**")
                .addResourceLocations("file:" + basePath + "category_img/");

        registry.addResourceHandler("/profile_img/**")
                .addResourceLocations("file:" + basePath + "profile_img/");
    }
}
