package com.mukesh.api.tipper.geeksforgeeks.parser;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class SolutionParser {

    private SolutionParser() {
    }

    public static Document getWebDocument(String url) {
        try {
            return Jsoup.connect(url).get();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Document("<body></body>");
    }

    public static String getProblemLink(Document document) {
        Element practiceLinkDiv = document.getElementById("practiceLinkDiv");
        if (practiceLinkDiv != null) {
            Elements a = practiceLinkDiv.getElementsByTag("a");
            if (!a.isEmpty()) {
                return a.attr("href");
            }
        }

        Element tryItDiv = document.getElementById("try-it");
        if (tryItDiv != null) {
            Elements a = tryItDiv.getElementsByTag("a");
            if (!a.isEmpty()) {
                return a.attr("href");
            }
        }
        return "";
    }

    public static String getSolutionDescription(Document document) {

        try {
            // DELETE Ad
            document.getElementsByClass("main_wrapper").remove();
            document.getElementsByClass("three_dot_dropdown_content").remove();

            document.getElementsByTag("img").forEach(e -> e.attr("width", "40%"));

            document.getElementsByClass("article-bottom-buttons").remove();
            document.getElementsByClass("code-output-container").remove();

            document.getElementsByClass("onopen-discussion-panel").remove();
            document.getElementsByClass("discussion_panel").remove();
            document.getElementsByClass("article-pgnavi").remove();

            document.getElementsByAttributeValue("id", "_GFG_ABP_Incontent_728x90").remove();
            document.getElementsByAttributeValue("id", "GFG_AD_InContent_Desktop_728x280").remove();

            document.getElementsByAttributeValue("id", "personalNoteDiv").remove();
            document.getElementsByAttributeValue("id", "practiceLinkDiv").remove();

            document.getElementsByClass("code-gutter").remove();

            // DELETE Other Language Code
            Elements divs = document.getElementsByClass("tabtitle");
            divs.forEach((Element element) -> {
                if (!element.text().trim().equals("Java")) {
                    Element element1 = element.nextElementSibling();
                    element1.remove();
                    element.remove();
                }
            });

            return document.getElementsByTag("article").toString();
        } catch (Exception ex) {
            return "";
        }
    }
}
