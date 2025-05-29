package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.CompanyTagRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/companyTags")
public class CompanyTagController {

    public final CompanyTagRepository tagRepository;

    CompanyTagController(CompanyTagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
    
    @GetMapping()
    public List<CompanyTag> getAllQuestionUrls() {

        List<CompanyTag> companyTags = new ArrayList<>();
        tagRepository.findAll().forEach(companyTags::add);
        return companyTags;
    }


}
