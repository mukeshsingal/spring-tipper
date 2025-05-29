package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dto.QuestionDTO;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.CompanyTagRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.TopicTagRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    public final QuestionRepository gfgRepository;
    public final CompanyTagRepository tagRepository;
    public final TopicTagRepository topicTagRepository;

    QuestionController(QuestionRepository gfgRepository, CompanyTagRepository tagRepository,
            TopicTagRepository topicTagRepository) {
        this.gfgRepository = gfgRepository;
        this.tagRepository = tagRepository;
        this.topicTagRepository = topicTagRepository;
    }

    
    @GetMapping()
    public List<QuestionDTO> getAllQuestionUrls() {
        
        
        List<QuestionDTO> questions = new ArrayList<>();
        gfgRepository.findByIsDeletedAndStatus(false, ProgressStatus.NOT_DONE)
                .forEach(question -> questions.add(QuestionDTO.generate(question)));
        return questions;
    }

    
    @GetMapping("/favorite")
    public List<QuestionDTO> getAllFavorite() {
        List<QuestionDTO> questions = new ArrayList<>();
        gfgRepository.findByIsFavourite(true).forEach(question -> questions.add(QuestionDTO.generate(question)));
        return questions;
    }

    
    @GetMapping("/done")
    public List<QuestionDTO> getAllDone() {
        List<QuestionDTO> questions = new ArrayList<>();
        gfgRepository.findByStatus(ProgressStatus.DONE)
                .forEach(question -> questions.add(QuestionDTO.generate(question)));
        return questions;
    }

    
    @GetMapping("/byId/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return gfgRepository.findById(id).get();
    }

    
    @GetMapping("/findByCompanyTag/{name}")
    public List<Question> getQuestionByCompanyTag(@PathVariable String name) {
        List<Question> questions = new ArrayList<>();
        Optional<CompanyTag> tag = tagRepository.findByName(name);
        if (tag.isPresent()) {
            return gfgRepository.findByCompanyTags_Name(tag.get().getName());
        }
        return questions;
    }

    
    @GetMapping("/findByTopicTag/{name}")
    public List<Question> getQuestionByTopicTag(@PathVariable String name) {
        List<Question> questions = new ArrayList<>();
        Optional<TopicTag> tag = topicTagRepository.findByName(name);
        if (tag.isPresent()) {
            return gfgRepository.findByTopicTags_Name(tag.get().getName());
        }
        return questions;
    }

    
    @PostMapping("/create")
    public Question createQuestion(@RequestBody Question question) {
        String title = question.getTitle();

        if (!gfgRepository.existsByTitle(title)) {
            Set<CompanyTag> companyTagsUpdated = new HashSet<>();
            Set<TopicTag> topicTagsTagsUpdated = new HashSet<>();

            Set<CompanyTag> companyTags = question.getCompanyTags();
            Set<TopicTag> topicTags = question.getTopicTags();

            for (CompanyTag tag : companyTags) {
                String tagName = tag.getName();
                Optional<CompanyTag> existingTag = tagRepository.findByName(tagName);
                companyTagsUpdated.add(existingTag.isPresent() ? existingTag.get() : tag);
            }
            for (TopicTag tag : topicTags) {
                String tagName = tag.getName();
                Optional<TopicTag> existingTag = topicTagRepository.findByName(tagName);
                topicTagsTagsUpdated.add(existingTag.isPresent() ? existingTag.get() : tag);
            }

            question.setStatus(ProgressStatus.NOT_DONE);
            question.setCompanyTags(companyTagsUpdated);
            question.setTopicTags(topicTagsTagsUpdated);
            question.setCreated(new Date());
            question.setUpdated(new Date());

            this.gfgRepository.save(question);
        } else {
            return this.gfgRepository.findByTitle(title).get(0);
        }
        return question;
    }

    
    @PutMapping("/{id}/done")
    public Question markDone(@PathVariable String id) {
        Question question = this.gfgRepository.findById(id).get();
        if (question.getStatus() == ProgressStatus.DONE) {
            question.setStatus(ProgressStatus.NOT_DONE);
        } else {
            question.setStatus(ProgressStatus.DONE);
        }
        this.gfgRepository.save(question);
        return question;
    }

    
    @PutMapping("/{id}/favorite")
    public Question markFavorite(@PathVariable String id) {
        Question question = this.gfgRepository.findById(id).get();
        question.setFavourite(!question.isFavourite());
        this.gfgRepository.save(question);
        return question;
    }

    
    @PutMapping(value = "/{id}/delete", name = "Soft delete")
    public Question markDeleted(@PathVariable String id) {
        Question question = this.gfgRepository.findById(id).get();
        question.setDeleted(!question.isDeleted());
        this.gfgRepository.save(question);
        return question;
    }

    
    @PutMapping("/{id}")
    public void deleteQuestion(@PathVariable String id) {
        this.gfgRepository.deleteById(id);
    }

    
    @DeleteMapping()
    public void deleteAllQuestions() {
        this.gfgRepository.deleteAll();
    }
}
