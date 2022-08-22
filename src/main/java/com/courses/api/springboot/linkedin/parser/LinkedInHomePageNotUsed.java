package com.courses.api.springboot.linkedin.parser;

import com.courses.api.springboot.linkedin.parser.library.SeleniumHelper;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.xml.ws.WebEndpoint;

@Component
@Getter
@Setter
public class LinkedInHomePageNotUsed {


    //@Value("https://www.linkedin.com/jobs/search?keywords=Software%2BEngineer&location=India&geoId=102713980&f_TPR=r604800&f_PP=105214831&currentJobId=2881412210&position=4&pageNum=5")
    //@Value("https://www.linkedin.com/jobs/search?keywords=Software%2BEngineer&location=India&geoId=102713980&f_TPR=r604800&f_PP=105214831&currentJobId=2881412210&position=4&pageNum=5")
    private String linkedinUrl;

    @Autowired
    public WebDriver driver;

    @FindBy(id = "session_key")
    public WebElement emailInput;

    @FindBy(id = "session_password")
    public WebElement passwordInput;

    @FindBy(className = "authwall-join-form__form-toggle--bottom")
    public WebElement signInButton;

    @FindBy(className = "sign-in-form__submit-button")
    public WebElement submitLoginButton;


    @Autowired
    public SeleniumHelper helper;

    @PostConstruct
    public void initDriver() {
        PageFactory.initElements(driver, this);
    }

    public void companyFilter()  {
        driver.findElement(By.xpath("//button[@aria-label='Company filter. Clicking this button displays all Company filter options.']")).click();
        WebElement input = driver.findElement(By.xpath("//input[@placeholder='Add a company']"));
        input.sendKeys("Paypal");

        helper.waitInSeconds(5);


        input.sendKeys(Keys.ARROW_DOWN);

        WebElement element = driver.findElement(By.className("basic-typeahead__triggered-content"));
        System.out.println(element.getAttribute("innerHTML"));
        System.out.println(element.toString());


//        WebElement l = driver.findElement(By.id("gsc-i-id1"));
//        // Actions class
//        Actions a = new Actions(driver);
//        a.moveToElement(input).click();
//        //enter text with keyDown() SHIFT key ,keyUp() then build() ,perform()
//        a.keyDown(Keys.SHIFT);
//        a.sendKeys("Paypal").keyDown().build().perform();



//        WebElement input2 = driver.findElement(By.xpath("//input[@placeholder='Add a company']"));
//        input2.sendKeys(Keys.DOWN);
//        input2.sendKeys("HEYLL");
//        input2.sendKeys(Keys.ENTER);
//
//        input.sendKeys(Keys.ENTER);
//        helper.wait(2);
//        WebElement cancelButton = driver.findElement(By.xpath("//button[@aria-label='Cancel Company filter']"));
//        WebElement followingSibling = cancelButton.findElement(By.xpath("following-sibling::*"));
//        followingSibling.click();
    }

    public void completeFilter() {
        helper.waitInSeconds(10);

        companyFilter();

//        driver.findElement(By.xpath("//button[@aria-label='Job Type filter. Clicking this button displays all Job Type filter options.'] ")).click();
//        helper.waitForElementToBeVisible(By.id("jobType-F"));
//        driver.findElement(By.xpath("//label[@for='jobType-F']")).click();
//        helper.wait(10);
//        WebElement cancelButton = driver.findElement(By.xpath("//button[@aria-label='Close Job Type filter']"));
//        WebElement followingSibling = cancelButton.findElement(By.xpath("following-sibling::*"));
//        followingSibling.click();
//
//
//        driver.findElement(By.xpath("//button[@aria-label='Date Posted filter. Past Week filter is currently applied. Clicking this button displays all Date Posted filter options.']")).click();
//        helper.waitForElementToBeVisible(By.id("timePostedRange-r86400"));
//        driver.findElement(By.xpath("//label[@for='timePostedRange-r86400']")).click();
//        helper.wait(10);
//        cancelButton = driver.findElement(By.xpath("//button[@aria-label='Close Date Posted filter']"));
//        followingSibling = cancelButton.findElement(By.xpath("following-sibling::*"));
//        followingSibling.click();
    }

    public void login(String username, String password) {
        emailInput.sendKeys(username);
        passwordInput.sendKeys(password);
        submitLoginButton.click();
    }

    public void parse() {
        driver.navigate().to(linkedinUrl);
//        driver.navigate().to(linkedinUrl);
//
//        By existingUserButton = By.className("authwall-join-form__form-toggle--bottom");
//
//        helper.waitForElementToBeVisible(existingUserButton);
//        if(helper.isVisible(existingUserButton)) {
//            signInButton.click();
//            login("mukeshsingal3@gmail.com", "@2Singal");
//        }
//
//        driver.navigate().to(linkedinUrl);
        completeFilter();
    }
}
