package com.courses.api.springboot.linkedin.parser;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Company;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.JobApplication;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Status;
import com.courses.api.springboot.geeksforgeeks.database.repository.CompanyRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.JobRepository;
import com.courses.api.springboot.linkedin.parser.library.SeleniumHelper;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@Component
@Getter
@Setter
public class CompanyJobParser {

    public static Logger LOGGER = Logger.getLogger("LinkedInHomePageNoLogin");

    @Value("https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=India&locationId=&geoId=102713980&f_TPR=r86400&f_JT=F&position=1&pageNum=0")
    private String linkedinUrl;

    @Autowired
    public WebDriver driver;

    @Autowired
    public SeleniumHelper helper;

    @Autowired
    public JobRepository jobRepository;
    @Autowired
    public CompanyRepository companyRepository;

    @PostConstruct
    public void initDriver() {
        PageFactory.initElements(driver, this);
    }

    public void parse(String companyName) {

        Company company = companyRepository.findByName(companyName);

        driver.navigate().to(company.getCompanyUrl());
        helper.waitInSeconds(10);
        processCompany(company);
        LOGGER.info(String.format("[%s] --- company processed successfully ", companyName));
    }

    private void processCompany(Company company) {

        List<WebElement> jobs = driver.findElements(By.xpath("//div[@class='org-top-card-summary-info-list__info-item']"));

        String industry = jobs.get(0).getText();
        String location = jobs.get(1).getText();

        LOGGER.info(String.format("[%] Found industry %s", industry, location));

        if(industry == null || location == null) {
            return;
        }
        company.setIndustry(industry);
        company.setLocation(location);

        companyRepository.save(company);
    }


}
