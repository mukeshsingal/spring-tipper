package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.list.QuestionList;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.*;
import com.courses.api.springboot.geeksforgeeks.database.repository.ChapterRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.QuestionListRepository;
import com.courses.api.springboot.geeksforgeeks.database.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class QuestionListController {

    private static final String LIST_ENDPOINT = "/api/lists";
    @Autowired
    QuestionListRepository questionListRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    ChapterRepository chapterRepository;

    @CrossOrigin
    @GetMapping(LIST_ENDPOINT)
    public List<QuestionList> getAllList() {
        List<QuestionList> questions = new ArrayList<>();
        questionListRepository.findAll().forEach(questionList -> {
            Collections.sort(questionList.getList(), (Question a, Question b) -> {
                return a.getCreated().after(b.getCreated()) ? 1 : 0;
            });
            questions.add(questionList);
        });
        return questions;
    }

    @CrossOrigin
    @GetMapping(LIST_ENDPOINT+"/byChapter/{chapterName}")
    public List<QuestionList> getListsByChapterName(@PathVariable String chapterName) {
        List<QuestionList> questions = new ArrayList<>();
        questionListRepository.findByChapter_ChapterNameOrderByPositionAsc(chapterName).forEach(questionList -> {
            Collections.sort(questionList.getList(), (Question a, Question b) -> {
                return a.getCreated().after(b.getCreated()) ? 1 : 0;
            });
            questions.add(questionList);
        });
        return questions;
    }


    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value = LIST_ENDPOINT)
    public QuestionList createQuestionList(@RequestBody QuestionList questionList) {

        List<Question> actualQuestion = new ArrayList<>();
        List<Question> reqQuestionList = questionList.getList();

        for(Question question : reqQuestionList) {
            String questionId = question.getId();
            if(questionId != null && questionId != "") {
                actualQuestion.add(this.questionRepository.findById(questionId).get());
            }
        }
        questionList.setList(actualQuestion);



        this.questionListRepository.save(questionList);
        return questionList;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value = LIST_ENDPOINT+"/{listId}/add_question/{questionId}")
    public QuestionList addQuestionToQuestionList(@PathVariable String listId, @PathVariable String questionId) {

        Question question = this.questionRepository.findById(questionId).get();
        QuestionList questionList = this.questionListRepository.findById(listId).get();

        List<Question> questions = questionList.getList();

        boolean ans = questions.stream().anyMatch(que -> que.getId() == questionId);
        if(!ans) {
            questions.add(question);
        }
        questionList.setList(questions);

        this.questionListRepository.save(questionList);
        return questionList;
    }



}
