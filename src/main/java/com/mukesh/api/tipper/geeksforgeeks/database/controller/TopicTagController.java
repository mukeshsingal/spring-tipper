package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.TopicTagRepository;

@RestController
@CrossOrigin
public class TopicTagController {

    public final TopicTagRepository tagRepository;
    public final QuestionRepository questionRepository;

    TopicTagController(TopicTagRepository tagRepository, QuestionRepository questionRepository) {
        this.tagRepository = tagRepository;
        this.questionRepository = questionRepository;
    }

    @GetMapping("/api/solutions/topicTags")
    public List<TopicTag> getAllTags() {
        String[] excluded = new String[] { "C++", "C-", "C#", "CPP", "Java", "Operating", "Technical", "python", "blog",
                "quiz", "sheet" };

        List<TopicTag> companyTags = new ArrayList<TopicTag>();
        tagRepository.findAll().forEach(companyTags::add);
        companyTags = companyTags.stream().filter(tag -> {
            for (String excludedTag : excluded) {
                if (tag.getName().toLowerCase().contains(excludedTag.toLowerCase())) {
                    return false;
                }
            }
            return true;
        }).toList();
        return companyTags;
    }

    @GetMapping("/api/topicTags")
    public List<TopicTag> getAllQuestionUrls() {
        List<TopicTag> companyTags = new ArrayList<TopicTag>();
        tagRepository.findAll().forEach(companyTags::add);

        return companyTags.stream()
                .filter(i -> questionRepository.countByIsDeletedFalseAndTopicTags_Name(i.getName()) > 0).toList();

    }

    @GetMapping("/api/topicTags/stats")
    public Map<TopicTag, HashMap<String, Long>> getTopicTagsStats() {
    
        HashMap<TopicTag, HashMap<String, Long>> doneQuestions = new HashMap<>();

        for (TopicTag topicTag : tagRepository.findAll()) {
            HashMap<String, Long> stats = new HashMap<>();
            stats.put("DONE",
                    questionRepository.countByStatusIsAndTopicTags_Name(ProgressStatus.DONE, topicTag.getName()));
            stats.put("ALL", questionRepository.countByTopicTags_Name(topicTag.getName()));
            doneQuestions.put(topicTag, stats);
        }
        return doneQuestions;
    }

}
