package com.mukesh.api.tipper.geeksforgeeks.parser.impl;

public class ParserFactory {
    private static BaseParser simpleParser = new SimpleQuestionParser();
    private static BaseParser practiceParser = new PracticeQuestionParser();

    public static BaseParser getQuestionParser(String url) {

        if (url.startsWith("https://practice.geeksforgeeks.org/problems") || url.startsWith("https://www.geeksforgeeks.org/problems/")) {
            System.out.println("Practice URL: " + url);
            return practiceParser;
        }
        else {
            System.out.println("sending siple parser");
            return simpleParser;
        }

    }
}
