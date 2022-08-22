package com.courses.api.springboot.linkedin.parser;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Company;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.JobApplication;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Status;
import com.courses.api.springboot.geeksforgeeks.database.repository.CompanyRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.JobRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.QuestionRepository;
import com.courses.api.springboot.linkedin.parser.library.SeleniumHelper;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
@Getter
@Setter
public class LinkedInJobParser {

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

        List<Company> companyList = companyRepository.findByActive(false);

        List<String> companies = companyList.stream().map((company -> company.getName())).collect(Collectors.toList());


        LOGGER.info(String.format("[%s] --- Started Parsing jobs ", companyName));
        driver.navigate().to(linkedinUrl);
        helper.waitInSeconds(10);
        setCompanyFilter(companyName);
        LOGGER.info(String.format("[%s] --- company filter set successfully ", companyName));
        setLocationFilter();
        LOGGER.info(String.format("[%s] --- location filter set successfully ", companyName));
        scrollToBottom();
        LOGGER.info(String.format("[%s] --- scroll to the bottom successfully ", companyName));
        processJobs(companies);
        LOGGER.info(String.format("[%s] --- jobs processed successfully ", companyName));
    }

    public void parseLastDay() {
        List<Company> companyList = companyRepository.findByActive(false);

        List<String> companies = companyList.stream().map((company -> company.getName())).collect(Collectors.toList());
        driver.navigate().to(linkedinUrl);
        helper.waitInSeconds(10);
        setLocationFilter();
        scrollToBottom();
        processJobs(companies);
    }

    public void setCompanyFilter(String companyName) {
        List<String> companies = Arrays.asList(companyName);
        driver.findElement(By.xpath("//button[@aria-label='Company filter. Clicking this button displays all Company filter options.']")).click();
        WebElement section = driver.findElement(By.xpath("//section[@aria-label=\"Add a filter for Company\"]"));
        WebElement input = section.findElement(By.xpath("//input[@placeholder='Add a filter']"));

        for (String company : companies) {
            try {
                input.sendKeys(company);
                helper.waitForElementToBeVisible(By.id("f_C-typeahead-list"));
                helper.waitInSeconds(5);
                WebElement ul = driver.findElement(By.id("f_C-typeahead-list"));
                List<WebElement> options = ul.findElements(By.tagName("li"));
                options.get(0).click();
            } catch (Exception ex) {
                input.sendKeys(Keys.BACK_SPACE);
                helper.waitForElementToBeVisible(By.id("f_C-typeahead-list"));
                helper.waitInSeconds(5);
                WebElement ul = driver.findElement(By.id("f_C-typeahead-list"));
                List<WebElement> options = ul.findElements(By.tagName("li"));
                options.get(0).click();
            }
        }
        driver.findElement(By.xpath("//section[@aria-label=\"Add a filter for Company\"]//following-sibling::button[@class=\"filter__submit-button\"]")).click();
    }

    private void setLocationFilter() {
        List<String> locations = Arrays.asList("Bengaluru", "Hyderabad");
        driver.findElement(By.xpath("//button[@aria-label='Location filter. Clicking this button displays all Location filter options.']")).click();
        helper.waitInSeconds(1);
        WebElement input = driver.findElement(By.xpath("//section[@aria-label=\"Add a filter for Location\"]//input[@placeholder=\"Add a filter\"]"));
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//section[@aria-label=\"Add a filter for Location\"]//input[@placeholder=\"Add a filter\"]")));

        for (String location : locations) {
            try {
                input.sendKeys(location);
                helper.waitForElementToBeVisible(By.id("f_PP-typeahead-list"));
                helper.waitInSeconds(5);
                WebElement ul = driver.findElement(By.id("f_PP-typeahead-list"));
                List<WebElement> options = ul.findElements(By.tagName("li"));
                options.get(0).click();
            } catch (Exception ex) {
                input.sendKeys(Keys.BACK_SPACE);
                helper.waitForElementToBeVisible(By.id("f_PP-typeahead-list"));
                helper.waitInSeconds(5);
                WebElement ul = driver.findElement(By.id("f_PP-typeahead-list"));
                List<WebElement> options = ul.findElements(By.tagName("li"));
                options.get(0).click();
            }
        }
        driver.findElement(By.xpath("//section[@aria-label=\"Add a filter for Location\"]//following-sibling::button[@class=\"filter__submit-button\"]")).click();
    }

    public void scrollToBottom() {
        try {
            WebElement div = driver.findElement(By.xpath("//div[contains(@class, \"see-more-jobs__viewed-all\")]"));
            List<WebElement> jobs = driver.findElements(By.xpath("//a[contains(@class, \"base-card__full-link\")]"));

            while (!div.isDisplayed() && jobs.size() < 150) {
                helper.waitInSeconds(5);

                helper.executeScript("window.scrollBy(0,document.body.scrollHeight)");

                if (div.findElement(By.xpath("//button[@aria-label=\"Load more results\"]")).isDisplayed()) {
                    div.findElement(By.xpath("//button[@aria-label=\"Load more results\"]")).click();
                    helper.waitInSeconds(5);
                }
                div = driver.findElement(By.xpath("//div[contains(@class, \"see-more-jobs__viewed-all\")]"));
                jobs = driver.findElements(By.xpath("//a[contains(@class, \"base-card__full-link\")]"));
            }
        } catch (Exception ex) {
            LOGGER.severe("Exception occurred while scrolling to the bottom. " + ex);
        }
    }

    private void processJobs(List<String> blackList) {
        System.out.print("Processing Jobs");

        int savedJobsCount = 0;
        int alreadySaved = 0;
        List<WebElement> jobs = driver.findElements(By.xpath("//div[contains(@class, \"base-search-card--link\")]"));

        LOGGER.info("Found " + jobs.size() + " Jobs");
        int count = 1;
        for (WebElement job : jobs) {
            try {
                LOGGER.info(String.format("----------------------%d---------------------", count++));
                helper.executeScript("var d = document.getElementById(\"toasts\"); if(d!=null) d.remove();");

                helper.waitInSeconds(2);

                new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(job)).click();

                helper.waitInSeconds(4);

                String logoUrl = job.findElement(By.tagName("img")).getAttribute("src");
                String companyUrl = job.findElement(By.tagName("h4")).findElement(By.tagName("a")).getAttribute("href");
                String companyName = job.findElement(By.tagName("h4")).findElement(By.tagName("a")).getText();
                if(blackList.indexOf(companyName) != -1) {
                    LOGGER.info(String.format("Skipped blacklist %s", companyName));
                    continue;
                }

                LOGGER.info(String.format("[%s] --- Processing Logo URL %s ", companyName, logoUrl));
                LOGGER.info(String.format("[%s] --- Processing companyUrl %s ", companyName, companyUrl));
                LOGGER.info(String.format("[%s] --- Processing CompanyName %s ", companyName, companyName));

                if (!companyRepository.existsByName(companyName)) {
                    Company company = new Company();
                    company.setName(companyName);
                    company.setCompanyUrl(companyUrl);
                    company.setLogoUrl(logoUrl);
                    company.setActive(true);
                    company.setUpdateAt(new Date());
                    company.setCreatedAt(new Date());
                    companyRepository.save(company);
                    LOGGER.info(String.format("Saved company %s ", companyName));
                }

                String jobTitle = helper.findElementByClassName("h2", "top-card-layout__title").getText();
                String location = helper.findByXPath("//span[@class=\"topcard__flavor topcard__flavor--bullet\"]").getText();
                String description = helper.findElementByClassName("div", "description__text").findElement(By.tagName("div")).getAttribute("innerHTML");
                String link = helper.findElementByClassName("a", "topcard__link").getAttribute("href");
                String id = getJobIdFromURL(link);

                if (jobTitle == null || id == null || companyName == null) {
                    continue;
                }
                LOGGER.info(String.format("[%s] --- Processing jobTitle %s ", companyName, jobTitle));
                LOGGER.info(String.format("[%s] --- Processing location %s ", companyName, location));
                LOGGER.info(String.format("[%s] --- Processing link %s ", companyName, link));
                LOGGER.info(String.format("[%s] --- Processing id %s ", companyName, id));

                if (!jobRepository.existsByJobId(id)) {
                    JobApplication application = new JobApplication();
                    application.setJobId(id);
                    application.setCompanyName(companyName);
                    application.setLocation(location);
                    application.setJobDescription(description);
                    application.setUrl(link);
                    application.setCreatedAt(new Date());
                    application.setUpdateAt(new Date());
                    application.setDatePosted(new Date());
                    application.setStatus(Status.UNSTARED);
                    application.setJobTitle(jobTitle);
                    jobRepository.save(application);
                    LOGGER.info(String.format("[%s] --- %s Saved in Database. ", companyName, id));
                    savedJobsCount++;
                }
                else {
                    alreadySaved++;
                    LOGGER.info(String.format("[%s] --- %s Job already saved. ", companyName, id));
                }
            } catch (Exception ex) {
                LOGGER.info("Exception occurred while parsing the job. " + ex);
            }
        }
        LOGGER.info(String.format("Saved #%d, Skipped #%d, Error #%d", savedJobsCount, alreadySaved, jobs.size() - alreadySaved - savedJobsCount));

    }

    private String getJobIdFromURL(String url) {
        String[] strings = url.split("\\?")[0].split("-");
        return strings[strings.length - 1];
    }


}
