package com.courses.api.springboot.geeksforgeeks.database.controller;


import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import com.courses.api.springboot.geeksforgeeks.database.model.dto.QuestionDTO;
import com.courses.api.springboot.geeksforgeeks.database.repository.CompanyTagRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.QuestionRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.TopicTagRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class QuestionController {

    @Autowired
    public QuestionRepository gfgRepository;
    @Autowired
    public CompanyTagRepository tagRepository;
    @Autowired
    public TopicTagRepository topicTagRepository;

    @CrossOrigin
    @GetMapping("/questions")
    public List<QuestionDTO> getAllQuestionUrls() {
        List<QuestionDTO> questions = new ArrayList<>();
        gfgRepository.findByIsDeleted(false).forEach(question -> {
            questions.add(QuestionDTO.generate(question));
        });
        return questions;
    }

    @CrossOrigin
    @GetMapping("/questions/favourite")
    public List<QuestionDTO> getAllFavourite() {
        List<QuestionDTO> questions = new ArrayList<>();
        gfgRepository.findByIsFavourite(true).forEach(question -> {
            questions.add(QuestionDTO.generate(question));
        });
        return questions;
    }

    @CrossOrigin
    @GetMapping("/questions/byId/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return gfgRepository.findById(id).get();
    }

    @CrossOrigin
    @GetMapping("/questions/findByCompanyTag/{name}")
    public List<Question> getQuestionByCompanyTag(@PathVariable String name) {
        List<Question> questions = new ArrayList<Question>();
        Optional<CompanyTag> tag = tagRepository.findByName(name);
        if (tag.isPresent()) {
            return gfgRepository.findByCompanyTags_Name(tag.get().getName());
        }
        return questions;
    }


    @CrossOrigin
    @GetMapping("/questions/findByTopicTag/{name}")
    public List<Question> getQuestionByTopicTag(@PathVariable String name) {
        List<Question> questions = new ArrayList<Question>();
        Optional<TopicTag> tag = topicTagRepository.findByName(name);
        if (tag.isPresent()) {
            return gfgRepository.findByTopicTags_Name(tag.get().getName());
        }
        return questions;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value ="/questions/create")
    public Question createQuestion(@RequestBody Question question) {
        String title = question.getTitle();

        if(!gfgRepository.existsByTitle(title)) {
            Set<CompanyTag> companyTagsUpdated = new HashSet<>();
            Set<TopicTag> topicTagsTagsUpdated = new HashSet<>();

            Set<CompanyTag> companyTags = question.getCompanyTags();
            Set<TopicTag> topicTags = question.getTopicTags();

            for(CompanyTag tag : companyTags) {
                String tagName = tag.getName();
                Optional<CompanyTag> existingTag = tagRepository.findByName(tagName);
                companyTagsUpdated.add(existingTag.isPresent() ?  existingTag.get() : tag);
            }
            for(TopicTag tag : topicTags) {
                String tagName = tag.getName();
                Optional<TopicTag> existingTag = topicTagRepository.findByName(tagName);
                topicTagsTagsUpdated.add(existingTag.isPresent() ?  existingTag.get() : tag);
            }

            question.setStatus(ProgressStatus.NOT_DONE);
            question.setCompanyTags(companyTagsUpdated);
            question.setTopicTags(topicTagsTagsUpdated);
            question.setCreated(new Date());
            question.setUpdated(new Date());

            this.gfgRepository.save(question);
        }
        else {
            return this.gfgRepository.findByTitle(title).get(0);
        }
        return question;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value ="/questions/{id}/done")
    public Question markDone(@PathVariable String id) {
        Question question = this.gfgRepository.findById(id).get();
        if(question.getStatus() == ProgressStatus.DONE){
            question.setStatus(ProgressStatus.NOT_DONE);
        }
        else {
            question.setStatus(ProgressStatus.DONE);
        }
        this.gfgRepository.save(question);
        return question;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value ="/questions/{id}/favourite")
    public Question markFavourite(@PathVariable String id) {
        Question question = this.gfgRepository.findById(id).get();
        if(question.isFavourite()){
            question.setFavourite(false);
        }
        else {
            question.setFavourite(true);
        }
        this.gfgRepository.save(question);
        return question;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value ="/questions/{id}/delete")
    public Question markDeleted(@PathVariable String id) {
        Question question = this.gfgRepository.findById(id).get();
        if(question.isDeleted()){
            question.setDeleted(false);
        }
        else {
            question.setDeleted(true);
        }
        this.gfgRepository.save(question);
        return question;
    }


    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value ="/questions/{id}/deletepermanent")
    public void deletePermanent(@PathVariable String id) {
        this.gfgRepository.deleteById(id);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.DELETE, value ="/questions")
    public void deletePermanent() {
        this.gfgRepository.deleteAll();
    }



}
