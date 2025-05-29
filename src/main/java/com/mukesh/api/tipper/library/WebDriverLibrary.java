package com.mukesh.api.tipper.library;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
@Lazy
public class WebDriverLibrary {

    @Bean
    public WebDriver getChromeDriver() {


//        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
       options.addArguments("--headless");
//        options.addArguments("start-maximized");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        
        return new ChromeDriver(options);
        

    }
}
