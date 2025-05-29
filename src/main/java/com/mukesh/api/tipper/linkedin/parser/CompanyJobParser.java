package com.mukesh.api.tipper.linkedin.parser;

import java.util.List;

import javax.annotation.PostConstruct;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.Company;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.CompanyRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.JobRepository;
import com.mukesh.api.tipper.library.SeleniumHelper;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Component
@Getter
@Setter
@Slf4j
public class CompanyJobParser {

    @Value("https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=India&locationId=&geoId=102713980&f_TPR=r86400&f_JT=F&position=1&pageNum=0")
    private String linkedinUrl;

    public final WebDriver driver;
    public final SeleniumHelper helper;
    public final JobRepository jobRepository;
    public final CompanyRepository companyRepository;

    CompanyJobParser(WebDriver driver, SeleniumHelper helper, JobRepository jobRepository,
            CompanyRepository companyRepository) {
        this.driver = driver;
        this.helper = helper;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
    }

    @PostConstruct
    public void initDriver() {
        PageFactory.initElements(driver, this);
    }

    public void parse(String companyName) {
        Company company = companyRepository.findByName(companyName);

        driver.navigate().to(company.getCompanyUrl());
        helper.waitInSeconds(10);
        processCompany(company);
        log.info(String.format("[%s] --- company processed successfully ", companyName));
    }

    private void processCompany(Company company) {

        List<WebElement> jobs = driver
                .findElements(By.xpath("//div[@class='org-top-card-summary-info-list__info-item']"));

        String industry = jobs.get(0).getText();
        String location = jobs.get(1).getText();

        log.info(String.format("[%1$s] Found industry %2$s", industry, location));

        if (industry == null || location == null) {
            return;
        }
        company.setIndustry(industry);
        company.setLocation(location);

        companyRepository.save(company);
    }

}
