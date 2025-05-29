package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.list.QuestionList;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.ChapterRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionListRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/lists")
public class QuestionListController {

    final QuestionListRepository questionListRepository;
    final QuestionRepository questionRepository;
    final ChapterRepository chapterRepository;

    QuestionListController(QuestionListRepository questionListRepository, QuestionRepository questionRepository,
            ChapterRepository chapterRepository) {
        this.questionListRepository = questionListRepository;
        this.questionRepository = questionRepository;
        this.chapterRepository = chapterRepository;
    }

    @GetMapping
    public List<QuestionList> getAllList() {
        List<QuestionList> questions = new ArrayList<>();
        questionListRepository.findAll().forEach(questionList -> {
            Collections.sort(questionList.getList(),
                    (Question a, Question b) -> a.getCreated().after(b.getCreated()) ? 1 : 0);
            questions.add(questionList);
        });
        return questions;
    }

    @GetMapping("/byChapter/{chapterName}")
    public List<QuestionList> getListsByChapterName(@PathVariable String chapterName) {
        List<QuestionList> questions = new ArrayList<>();
        questionListRepository.findByChapter_ChapterNameOrderByPositionAsc(chapterName)
                .forEach((QuestionList questionList) -> {
                    questionList.getList()
                            .sort((Question a, Question b) -> a.getCreated().after(b.getCreated()) ? 1 : 0);
                    questions.add(questionList);
                });
        return questions;
    }

    @PostMapping
    public QuestionList createQuestionList(@RequestBody QuestionList questionList) {

        List<Question> actualQuestion = new ArrayList<>();
        List<Question> reqQuestionList = questionList.getList();

        for (Question question : reqQuestionList) {
            String questionId = question.getId();
            if (questionId != null && !"".equals(questionId)) {
                actualQuestion.add(this.questionRepository.findById(questionId).get());
            }
        }
        questionList.setList(actualQuestion);

        this.questionListRepository.save(questionList);
        return questionList;
    }

    @PostMapping("/addQuestions")
    public QuestionList addQuestionToList(@RequestBody QuestionList questionList) {

        QuestionList existingList = this.questionListRepository.findById(questionList.getId()).get();

        List<Question> reqQuestionList = questionList.getList();

        for (Question question : reqQuestionList) {
            String questionId = question.getId();
            if (questionId != null && !"".equals(questionId)) {
                Question q = this.questionRepository.findById(questionId).get();
                Optional<Question> question1 = existingList.getList().stream()
                        .filter((Question ques) -> ques.getId().equals(q.getId())).findAny();
                if (!question1.isPresent()) {
                    existingList.getList().add(q);
                }
            }
        }

        this.questionListRepository.save(existingList);
        return questionList;
    }

    @PutMapping("/{listId}/add_question/{questionId}")
    public QuestionList addQuestionToQuestionList(@PathVariable String listId, @PathVariable String questionId) {

        Question question = this.questionRepository.findById(questionId).get();
        QuestionList questionList = this.questionListRepository.findById(listId).get();

        List<Question> questions = questionList.getList();

        boolean ans = questions.stream().anyMatch(que -> que.getId().equals(questionId));
        if (!ans) {
            questions.add(question);
        }
        questionList.setList(questions);

        this.questionListRepository.save(questionList);
        return questionList;
    }

}
