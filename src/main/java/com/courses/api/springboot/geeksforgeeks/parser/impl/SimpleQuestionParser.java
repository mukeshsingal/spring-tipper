package com.courses.api.springboot.geeksforgeeks.parser.impl;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.DifficultyLevel;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.util.*;
import java.util.stream.Stream;

public class SimpleQuestionParser implements BaseParser {

    @Override
    public String getSolutionDescription(Element document) {
        //DELETE Ad
        document.getElementsByClass("textBasedMannualAds").remove();
        document.getElementsByClass("code-output-container").remove();
        document.getElementsByAttributeValue("id", "personalNoteDiv").remove();
        document.getElementsByAttributeValue("id", "practiceLinkDiv").remove();

        document.getElementsByClass("code-gutter").remove();

        //DELETE Other Language Code
        Elements divs = document.getElementsByClass("tabtitle");
        divs.forEach((Element element) -> {
            if(!element.text().trim().equals("Java")){
                Node node =  element.nextSibling();
                node.remove();
                element.remove();
            }
        });

        return document.getElementsByTag("article").toString();
    }



    public String getQuestionTitle(Element document) {
        Elements entryContent = document.getElementsByTag("h1");
        return entryContent.text();
    }

    public Set<CompanyTag> getCompanyTags(Element document) {
//        Element element = document.getElementsByTag("footer").first();

        Set<CompanyTag> topicList = new HashSet<>();
//        Elements allSpans = element.children();
//        for (Element e : allSpans) {
//            if (e.nodeName().equals("span")) {
//                Elements tag = e.getElementsByClass("practiceButton");
//                tag.forEach(t-> topicList.add(new CompanyTag(t.text())));
//            }
//        }
        return topicList;
    }

    public Set<TopicTag> getQuestionTags(Element document) {
//        Element element = document.getElementsByTag("footer").first();

        HashSet<TopicTag> topicList = new HashSet<>();
//        Elements allSpans = element.children();
//        for (Element e : allSpans) {
//            if (e.nodeName().equals("span")) {
//                Elements tag = e.getElementsByClass("practiceButton");
//                tag.forEach(t-> topicList.add(new TopicTag(t.text())));
//            }
//        }
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
