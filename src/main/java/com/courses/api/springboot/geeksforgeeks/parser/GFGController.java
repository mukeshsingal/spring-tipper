package com.courses.api.springboot.geeksforgeeks.parser;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import com.courses.api.springboot.geeksforgeeks.database.repository.QuestionRepository;
import com.courses.api.springboot.geeksforgeeks.parser.dao.SolutionUrlRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class GFGController {

    @Autowired
    public QuestionRepository questionRepository;

    String mainPage = "https://www.geeksforgeeks.org/must-coding-questions-company-wise/";
    String questionUrl = "https://www.geeksforgeeks.org/convert-a-given-binary-tree-to-doubly-linked-list-set-4";
    String questionUrl2 = "https://practice.geeksforgeeks.org/problems/kadanes-algorithm/0";

    @CrossOrigin
    @RequestMapping(value = "/api/parsers/parse-solution/{questionId}", method = RequestMethod.POST)
    public Question getAllQuestionUrls(@RequestBody SolutionUrlRequestBody body, @PathVariable String questionId) {

        Question dbQuestion = questionRepository.findById(questionId).get();
        Question question = GFGParser.getQuestion(body.getSolutionUrl());
        dbQuestion.setSolutionDescription(question.getSolutionDescription());
        dbQuestion.setProblemUrl(body.getSolutionUrl());
        questionRepository.save(dbQuestion);
        return dbQuestion;
    }

    @GetMapping("/questions/all")
    public HashMap<String, List<Question>> getAllQuestionJson() {
        return GFGParser.getAllQuestions(mainPage);
    }

//    @CrossOrigin
//    @RequestMapping(method = RequestMethod.POST, value ="/question")
//    public Question getQuestion(@RequestBody PostRequestBody postRequestBody) {
//        Question question = GFGParser.getQuestion(postRequestBody.getUrl());
//        this.gfgRepository.save(question);
//        return question;
//    }


}
