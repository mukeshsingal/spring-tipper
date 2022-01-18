package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import com.courses.api.springboot.geeksforgeeks.database.repository.TopicTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TopicTagController {

    @Autowired
    public TopicTagRepository tagRepository;

    @CrossOrigin
    @GetMapping("/api/topicTags")
    public List<TopicTag> getAllQuestionUrls() {
        List<TopicTag> companyTags = new ArrayList<TopicTag>();
        tagRepository.findAll().forEach(companyTags::add);
        return companyTags;
    }


}
