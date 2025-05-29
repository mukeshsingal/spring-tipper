package com.mukesh.api.tipper.geeksforgeeks.parser.impl;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.HashMap;
import java.util.Set;

public interface BaseParser {
    default Question parseQuestion(String url) {

        Question question = new Question();
        try {
            Document document = Jsoup.connect(url).get();

            HashMap<String, String> map = getDifficultyLevel(document);
            question.setTitle(getQuestionTitle(document));
            question.setCompanyTags(getCompanyTags(document));
            question.setTopicTags(getQuestionTags(document));
            question.setSolutionDescription(getSolutionDescription(document));
            question.setProblemDescription(getProblemDescription(document));
            question.setDifficultyLevel(map.get("Difficulty"));
            question.setMarks(Integer.parseInt(map.get("questionRating")));
            question.setPracticeUrl(url);
            question.setStatus(ProgressStatus.NOT_DONE);

        } catch (Exception e) {
            System.out.println(url);
            System.out.println(e.getLocalizedMessage());
            e.printStackTrace();
        }

        return question;
    }

    String getSolutionDescription(Element document);

    String getProblemDescription(Element document);

    String getQuestionTitle(Element docuement);

    Set<CompanyTag> getCompanyTags(Element fullPageDiv);

    Set<TopicTag> getQuestionTags(Element fullPageDiv);

    HashMap<String, String> getDifficultyLevel(Element fullPageDiv);

    default String getText(String string) {
        return string.replaceAll("\u00A0", "").trim();
    }
}
