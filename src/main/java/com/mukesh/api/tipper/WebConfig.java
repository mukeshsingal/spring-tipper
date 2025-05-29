package com.mukesh.api.tipper;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward all unmatched routes to index.html in the /public directory
        registry.addViewController("/{spring:[^\\.]*}").setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:[^\\.]*}").setViewName("forward:/index.html");
    }
}
