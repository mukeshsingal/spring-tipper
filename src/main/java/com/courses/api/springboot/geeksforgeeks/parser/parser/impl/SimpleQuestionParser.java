package com.courses.api.springboot.geeksforgeeks.parser.parser.impl;

import com.courses.api.springboot.geeksforgeeks.parser.dto.*;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.*;
import java.util.stream.Stream;

public class SimpleQuestionParser implements BaseParser {

    public String getQuestionTitle(Element document) {
        Elements entryContent = document.getElementsByClass("entry-title");
        return entryContent.text();
    }

    public Set<CompanyTag> getCompanyTags(Element document) {
        Element element = document.getElementsByTag("footer").first();

        Set<CompanyTag> topicList = new HashSet<>();
        Elements allSpans = element.children();
        for (Element e : allSpans) {
            if (e.nodeName().equals("span")) {
                Elements tag = e.getElementsByClass("practiceButton");
                tag.forEach(t-> topicList.add(new CompanyTag(t.text())));
            }
        }
        return topicList;
    }

    public Set<TopicTag> getQuestionTags(Element document) {
        Element element = document.getElementsByTag("footer").first();

        HashSet<TopicTag> topicList = new HashSet<>();
        Elements allSpans = element.children();
        for (Element e : allSpans) {
            if (e.nodeName().equals("span")) {
                Elements tag = e.getElementsByClass("practiceButton");
                tag.forEach(t-> topicList.add(new TopicTag(t.text())));
            }
        }
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
            return DifficultyLevel.Basic;
        else if (levelString.equals("level-2"))
            return DifficultyLevel.Easy;
        else if (levelString.equals("level-3"))
            return DifficultyLevel.Medium;
        else if (levelString.equals("level-4"))
            return DifficultyLevel.Hard;
        else
            return DifficultyLevel.Expert;
    }
}
