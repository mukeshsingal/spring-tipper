package com.courses.api.springboot.geeksforgeeks.parser.impl;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;

public interface BaseParser {
    default Question getQuestion(String url) {

        Question question = new Question();
        try {
            Document document = Jsoup.connect(url).get();

            question.setTitle(getQuestionTitle(document));
            question.setCompanyTags(getCompanyTags(document));
            question.setTopicTags(getQuestionTags(document));
            question.setSolutionDescription(getSolutionDescription(document));
//            HashMap<String, String> map = getDifficultyLevel(document);
//            question.setDifficultyLevel(map.get("Difficulty"));
//            question.setQuestionRating(map.get("questionRating"));
            question.setProblemUrl(url);
            question.setStatus(ProgressStatus.NOT_DONE);

        } catch (IOException e) {
            System.out.println(e.getLocalizedMessage());
            e.printStackTrace();
        }

        return question;
    }

    String getSolutionDescription(Element document);

    String getQuestionTitle(Element docuement);

    Set<CompanyTag> getCompanyTags(Element fullPageDiv);

    Set<TopicTag> getQuestionTags(Element fullPageDiv);

    HashMap<String, String> getDifficultyLevel(Element fullPageDiv);

    default String getText(String string) {
        return string.replaceAll("\u00A0", "").trim();
    }
}
