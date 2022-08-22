package com.courses.api.springboot.linkedin.parser.library;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Component
public class SeleniumHelper {

    @Autowired
    private WebDriver driver;

    public void waitInSeconds(int seconds) {
        try{
            Thread.sleep(seconds * 1000);
        }
        catch (Exception ex) {

        }
    }

    /* STATE CHECK */

    public void waitForElementToBeVisible(By elementCondition, Duration duration) {
        WebDriverWait w = new WebDriverWait(driver, duration);
        w.until(ExpectedConditions.presenceOfElementLocated(elementCondition));
    }

    public void waitForElementToBeVisible(By elementCondition) {
        WebDriverWait w = new WebDriverWait(driver, Duration.ofSeconds(30));
        w.until(ExpectedConditions.presenceOfElementLocated(elementCondition));
    }

    public boolean isVisible(By element) {
        return driver.findElement(element).isDisplayed();
    }

    /* SEARCHING */

    public WebElement findElementById(String id) {
        return driver.findElement(By.id(id));
    }

    public WebElement findElementByClassName(String element, String className) {
        return driver.findElement(By.xpath("//" +  element + "[contains(@class, \"" +className + "\")]"));
    }
    public WebElement findByXPath(String xPath) {
        return driver.findElement(By.xpath(xPath));
    }

    /* JAVASCRIRPT */
    public void executeScript(String javascript) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(javascript, "");
    }

    public void executeScript(String javascript, String args) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(javascript, args);
    }

}
