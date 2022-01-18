package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.courses.api.springboot.geeksforgeeks.database.repository.CompanyTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CompanyTagController {

    @Autowired
    public CompanyTagRepository tagRepository;

    @CrossOrigin
    @GetMapping("/api/companyTags")
    public List<CompanyTag> getAllQuestionUrls() {
        List<CompanyTag> companyTags = new ArrayList<CompanyTag>();
        tagRepository.findAll().forEach(companyTags::add);
        return companyTags;
    }


}
