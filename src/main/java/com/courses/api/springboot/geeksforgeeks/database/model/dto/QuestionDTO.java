package com.courses.api.springboot.geeksforgeeks.database.model.dto;


import com.courses.api.springboot.geeksforgeeks.database.model.dao.list.QuestionList;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class QuestionDTO {
    private String id;
    private String title;
    private String difficultyLevel;
    private String problemUrl;
    private String practiceUrl;
    private ProgressStatus status;
    private Set<CompanyTag> companyTags;
    private Set<TopicTag> topicTags;

    public static QuestionDTO generate(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();

        questionDTO.setId(question.getId());
        questionDTO.setTitle(question.getTitle());
        questionDTO.setDifficultyLevel(question.getDifficultyLevel());
        questionDTO.setProblemUrl(question.getProblemUrl());
        questionDTO.setPracticeUrl(question.getPracticeUrl());
        questionDTO.setCompanyTags(question.getCompanyTags());
        questionDTO.setTopicTags(question.getTopicTags());
        questionDTO.setStatus(question.getStatus());
        return questionDTO;
    }
}

