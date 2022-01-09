package com.courses.api.springboot.geeksforgeeks.parser.impl;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.DifficultyLevel;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.*;

public class PracticeQuestionParser implements BaseParser {

    @Override
    public String getSolutionDescription(Element document) {
        return null;
    }

    public String getQuestionTitle(Element document) {
        Elements entryContent = document.getElementsByClass("problemTitle");
        Element elements = entryContent.first();
        return elements.text();
    }

    public Set<CompanyTag> getCompanyTags(Element document) {
        Element fullPageDiv = document.getElementsByClass("fullPageDiv").first();
        Element secondDiv = fullPageDiv.child(1);
        Element contentRows = secondDiv.child(0).child(0).child(0);
        Element questionTag = contentRows.child(1).child(1);
        Set<CompanyTag> tagList = new HashSet<>();
        for (Element e : questionTag.children()) {
            tagList.add(new CompanyTag(getText(e.text())));
        }
        return tagList;
    }

    public Set<TopicTag> getQuestionTags(Element document) {
        Element fullPageDiv = document.getElementsByClass("fullPageDiv").first();
        Element secondDiv = fullPageDiv.child(1);
        Element contentRows = secondDiv.child(0).child(0).child(0);
        Element questionTag = contentRows.child(1).child(0);
        HashSet<TopicTag> topicList = new HashSet<>();
        for (Element e : questionTag.children()) {
            if (e.nodeName().equals("a"))
                topicList.add(new TopicTag(getText(e.text())));
        }
        return topicList;
    }

    public HashMap<String, String> getDifficultyLevel(Element document) {
        Element fullPageDiv = document.getElementsByClass("fullPageDiv").first();
        Element secondDiv = fullPageDiv.child(1);
        Element contentRows = secondDiv.child(0).child(0).child(0);
        Element difficultyTag = contentRows.child(0).child(1);
        Element e = difficultyTag.children().first();

        String level = e.text();

        HashMap<String, String> map = new HashMap();
        if (level.contains(DifficultyLevel.Basic.toString())) {
            map.put("Difficulty", DifficultyLevel.Basic.toString());
        } else if (level.contains(DifficultyLevel.Easy.toString())) {
            map.put("Difficulty", DifficultyLevel.Easy.toString());
        } else if (level.contains(DifficultyLevel.Medium.toString())) {
            map.put("Difficulty", DifficultyLevel.Medium.toString());
        } else if (level.contains(DifficultyLevel.Hard.toString())) {
            map.put("Difficulty", DifficultyLevel.Hard.toString());
        } else {
            map.put("Difficulty", DifficultyLevel.Expert.toString());
        }

        String questionRating = level.substring(level.indexOf("Marks: ")).split(" ")[1];
        map.put("questionRating", questionRating);
        return map;
    }
}
