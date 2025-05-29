package com.mukesh.api.tipper.geeksforgeeks.parser.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.DifficultyLevel;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;

public class SimpleQuestionParser implements BaseParser {

    @Override
    public String getSolutionDescription(Element document) {
        // DELETE Ad
        document.getElementsByClass("textBasedMannualAds").remove();
        document.getElementsByClass("textBasedMannualAds_2").remove();
        document.getElementsByClass("code-output-container").remove();
        document.getElementsByAttributeValue("id", "personalNoteDiv").remove();
        document.getElementsByAttributeValue("id", "practiceLinkDiv").remove();

        document.getElementsByClass("code-gutter").remove();

        // DELETE Other Language Code
        Elements divs = document.getElementsByClass("tabtitle");
        divs.forEach((Element element) -> {
            if (!element.text().trim().equals("Java")) {
                Node node = element.nextSibling();
                node.remove();
                element.remove();
            }
        });

        return document.getElementsByTag("article").toString();
    }

    @Override
    public String getProblemDescription(Element document) {
        return null;
    }

    public String getQuestionTitle(Element document) {
        Elements entryContent = document.getElementsByTag("h1");
        return entryContent.text();
    }

    public Set<CompanyTag> getCompanyTags(Element document) {
        // Element element = document.getElementsByTag("footer").first();

        Set<CompanyTag> topicList = new HashSet<>();
        // Elements allSpans = element.children();
        // for (Element e : allSpans) {
        // if (e.nodeName().equals("span")) {
        // Elements tag = e.getElementsByClass("practiceButton");
        // tag.forEach(t-> topicList.add(new CompanyTag(t.text())));
        // }
        // }
        return topicList;
    }

    public Set<TopicTag> getQuestionTags(Element document) {
        // Element element = document.getElementsByTag("footer").first();

        HashSet<TopicTag> topicList = new HashSet<>();
        // Elements allSpans = element.children();
        // for (Element e : allSpans) {
        // if (e.nodeName().equals("span")) {
        // Elements tag = e.getElementsByClass("practiceButton");
        // tag.forEach(t-> topicList.add(new TopicTag(t.text())));
        // }
        // }
        return topicList;
    }

    public HashMap<String, String> getDifficultyLevel(Element document) {

        Element span = document.getElementsByClass("avg-rating").first();
        String[] classes = span.attr("class").split(" ");
        String className = Stream.of(classes).filter(name -> name.startsWith("level")).findFirst().get();

        DifficultyLevel dl = getLevel(className);

        HashMap<String, String> map = new HashMap();
        map.put("Difficulty", dl.toString());
        map.put("questionRating", span.text());
        return map;
    }

    public DifficultyLevel getLevel(String levelString) {
        if (levelString.equals("level-1"))
            return DifficultyLevel.BASIC;
        else if (levelString.equals("level-2"))
            return DifficultyLevel.EASY;
        else if (levelString.equals("level-3"))
            return DifficultyLevel.MEDIUM;
        else if (levelString.equals("level-4"))
            return DifficultyLevel.HARD;
        else
            return DifficultyLevel.EXPERT;
    }
}
