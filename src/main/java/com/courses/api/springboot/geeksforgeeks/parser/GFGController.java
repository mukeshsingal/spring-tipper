package com.courses.api.springboot.geeksforgeeks.parser;

import com.courses.api.springboot.geeksforgeeks.parser.dto.Question;
import com.courses.api.springboot.geeksforgeeks.parser.parser.GFGParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class GFGController {

    @Autowired
    public GfgRepository gfgRepository;

    String mainPage = "https://www.geeksforgeeks.org/must-coding-questions-company-wise/";
    String questionUrl = "https://www.geeksforgeeks.org/convert-a-given-binary-tree-to-doubly-linked-list-set-4";
    String questionUrl2 = "https://practice.geeksforgeeks.org/problems/kadanes-algorithm/0";

    @CrossOrigin
    @GetMapping("/questions")
    public HashMap<String, List<String>> getAllQuestionUrls() {
        return GFGParser.getQuestionUrlsCompanyWise(mainPage);
    }

    @GetMapping("/questions/all")
    public HashMap<String, List<Question>> getAllQuestionJson() {
        return GFGParser.getAllQuestions(mainPage);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value ="/question")
    public Question getQuestion(@RequestBody PostRequestBody postRequestBody) {
        Question question = GFGParser.getQuestion(postRequestBody.getUrl());
        this.gfgRepository.save(question);
        return question;
    }
}
