package com.mukesh.api.tipper.geeksforgeeks.parser.impl;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;
import org.jsoup.nodes.Element;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class PracticeQuestionParser implements BaseParser {

    @Override
    public String getSolutionDescription(Element document) {
        return null;
    }

    @Override
    public String getProblemDescription(Element document) {
        String jsontext = document.select("#__NEXT_DATA__").get(0).html();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsontext);
            JsonNode queries = jsonNode.path("props")
                    .path("pageProps")
                    .path("initialState")
                    .path("problemApi")
                    .path("queries");
            return queries.fields().next().getValue()
                    .path("data")
                    .path("problem_question")
                    .asText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }

    public String getQuestionTitle(Element document) {

        String jsontext = document.select("#__NEXT_DATA__").get(0).html();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsontext);
            JsonNode queries = jsonNode.path("props")
                    .path("pageProps")
                    .path("initialState")
                    .path("problemApi")
                    .path("queries");
            return queries.fields().next().getValue()
                    .path("data")
                    .path("problem_name")
                    .asText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
//        Elements entryContent = document.getElementsByTag("h3");
//        Element elements = entryContent.first();
//        return elements.text();
    }

    public Set<CompanyTag> getCompanyTags(Element document) {
//        Element fullPageDiv = document.getElementsByClass("fullPageDiv").first();
//        Element secondDiv = fullPageDiv.child(1);
//        Element contentRows = secondDiv.child(0).child(0).child(0);
//        Element questionTag = contentRows.child(1).child(1);
//        Set<CompanyTag> tagList = new HashSet<>();
//        for (Element e : questionTag.children()) {
//            tagList.add(new CompanyTag(getText(e.text())));
//        }
//        return tagList;
        Set<CompanyTag> tagList = new HashSet<>();
        String jsontext = document.select("#__NEXT_DATA__").get(0).html();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsontext);
            JsonNode queries = jsonNode.path("props")
                    .path("pageProps")
                    .path("initialState")
                    .path("problemApi")
                    .path("queries");
            JsonNode topicTags = queries.fields().next().getValue()
                    .path("data")
                    .path("tags")
                    .path("company_tags");

            for(int i = 0; i < topicTags.size(); i++) {
                tagList.add(new CompanyTag(getText(topicTags.get(i).asText())));
            }
            return tagList;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Set<TopicTag> getQuestionTags(Element document) {
        HashSet<TopicTag> topicList = new HashSet<>();
//        Element fullPageDiv = document.getElementsByClass("fullPageDiv").first();
//        Element secondDiv = fullPageDiv.child(1);
//        Element contentRows = secondDiv.child(0).child(0).child(0);
//        Element questionTag = contentRows.child(1).child(0);
//        HashSet<TopicTag> topicList = new HashSet<>();
//        for (Element e : questionTag.children()) {
//            if (e.nodeName().equals("a"))
//                topicList.add(new TopicTag(getText(e.text())));
//        }
//        return topicList;

        String jsontext = document.select("#__NEXT_DATA__").get(0).html();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsontext);
            JsonNode queries = jsonNode.path("props")
                    .path("pageProps")
                    .path("initialState")
                    .path("problemApi")
                    .path("queries");
            JsonNode topicTags = queries.fields().next().getValue()
                    .path("data")
                    .path("tags")
                    .path("topic_tags");

            for(int i = 0; i < topicTags.size(); i++) {
                topicList.add(new TopicTag(getText(topicTags.get(i).asText())));
            }
            return topicList;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public HashMap<String, String> getDifficultyLevel(Element document) {


        String jsontext = document.select("#__NEXT_DATA__").get(0).html();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(jsontext);
            JsonNode queries = jsonNode.path("props")
                    .path("pageProps")
                    .path("initialState")
                    .path("problemApi")
                    .path("queries");
            String difficulty = queries.fields().next().getValue()
                    .path("data")
                    .path("difficulty")
                    .asText();
            String marks = queries.fields().next().getValue()
                    .path("data")
                    .path("marks")
                    .asText();
            HashMap<String, String> map = new HashMap();
            map.put("Difficulty", difficulty);
            map.put("questionRating", marks);
            return map;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

//        Element fullPageDiv = document.getElementsByClass("fullPageDiv").first();
//        Element secondDiv = fullPageDiv.child(1);
//        Element contentRows = secondDiv.child(0).child(0).child(0);
//        Element difficultyTag = contentRows.child(0).child(1);
//        Element e = difficultyTag.children().first();
//
//        String level = e.text();


//        HashMap<String, String> map = new HashMap();
//        if (level.contains(DifficultyLevel.Basic.toString())) {
//            map.put("Difficulty", DifficultyLevel.Basic.toString());
//        } else if (level.contains(DifficultyLevel.Easy.toString())) {
//            map.put("Difficulty", DifficultyLevel.Easy.toString());
//        } else if (level.contains(DifficultyLevel.Medium.toString())) {
//            map.put("Difficulty", DifficultyLevel.Medium.toString());
//        } else if (level.contains(DifficultyLevel.Hard.toString())) {
//            map.put("Difficulty", DifficultyLevel.Hard.toString());
//        } else {
//            map.put("Difficulty", DifficultyLevel.Expert.toString());
//        }



//        String questionRating = level.substring(level.indexOf("Marks: ")).split(" ")[1];
//        map.put("questionRating", questionRating);
//        return map;
    }
}
