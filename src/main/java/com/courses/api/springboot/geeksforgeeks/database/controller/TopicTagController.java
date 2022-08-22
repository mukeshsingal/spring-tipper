package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import com.courses.api.springboot.geeksforgeeks.database.repository.QuestionRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.TopicTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class TopicTagController {

    @Autowired
    public TopicTagRepository tagRepository;
    @Autowired
    public QuestionRepository questionRepository;

    @CrossOrigin
    @GetMapping("/api/topicTags")
    public List<TopicTag> getAllQuestionUrls() {
        List<TopicTag> companyTags = new ArrayList<TopicTag>();
        tagRepository.findAll().forEach(companyTags::add);
        return companyTags;
    }

    @CrossOrigin
    @GetMapping("/api/topicTags/stats")
    public HashMap<TopicTag, HashMap<String, Long>> getTopicTagsStats() {

        HashMap<TopicTag, HashMap<String, Long>> doneQuestions = new HashMap<>();

        for (TopicTag topicTag : tagRepository.findAll()) {
            HashMap<String, Long> stats = new HashMap<>();
            stats.put("DONE", questionRepository.countByStatusIsAndTopicTags_Name(ProgressStatus.DONE, topicTag.getName()));
            stats.put("ALL", questionRepository.countByTopicTags_Name(topicTag.getName()));
            doneQuestions.put(topicTag, stats);
        }
        return doneQuestions;
    }




}
