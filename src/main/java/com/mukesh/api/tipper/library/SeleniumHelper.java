package com.mukesh.api.tipper.library;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Lazy
@Slf4j
public class SeleniumHelper {

    private final WebDriver driver;

    SeleniumHelper(WebDriver driver) {
        this.driver = driver;
    }

    public void waitInSeconds(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (Exception ex) {
            log.error("Exception ocurred while waitingInSecond", ex.getMessage());
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
        return driver.findElement(By.xpath("//" + element + "[contains(@class, \"" + className + "\")]"));
    }

    public WebElement findByXPath(String xPath) {
        return driver.findElement(By.xpath(xPath));
    }

    /* JAVASCRIPT */
    public void executeScript(String javascript) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(javascript, "");
    }

    public void executeScript(String javascript, String args) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(javascript, args);
    }

}
