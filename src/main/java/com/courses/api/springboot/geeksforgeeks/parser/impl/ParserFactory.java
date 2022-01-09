package com.courses.api.springboot.geeksforgeeks.parser.impl;

public class ParserFactory {
    private static BaseParser simpleParser = new SimpleQuestionParser();
    private static BaseParser practiceParser = new PracticeQuestionParser();

    public static BaseParser getBaseQuestionParser(String url) {
        if (url.startsWith("https://practice.geeksforgeeks.org/problems/")) {
            return practiceParser;
        }
        else {
            return simpleParser;
        }

    }
}
