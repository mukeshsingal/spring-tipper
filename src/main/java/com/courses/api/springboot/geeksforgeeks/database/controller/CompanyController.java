package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Company;
import com.courses.api.springboot.geeksforgeeks.database.model.dto.job.ResponseMessage;
import com.courses.api.springboot.geeksforgeeks.database.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000")
public class CompanyController {

    @Autowired
    private CompanyRepository repository;


    @GetMapping("/company/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Company company = this.repository.findById(id).get();

        if(company == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/company/findByName/{name}")
    public ResponseEntity<?> getByName(@PathVariable String name) {
        Company company = this.repository.findByName(name);

        if(company == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    /** --------   GET   --------- */
    @CrossOrigin
    @GetMapping("/company")
    public List<Company> getAll() {
        return this.repository.findAll();
    }

    @CrossOrigin
    @GetMapping("/company/active")
    public List<Company> getAllActive() {
        return this.repository.findByActive(true);
    }

    @CrossOrigin
    @GetMapping("/company/inactive")
    public List<Company> getAllInActive() {
        return this.repository.findByActive(false);
    }

    @CrossOrigin
    @PostMapping("/company/{companyName}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String companyName) {

        Company company = repository.findByName(companyName);
        if(company == null) {
            return new ResponseEntity<>(new ResponseMessage("Didn't find the company record."), HttpStatus.NOT_FOUND);
        }
        else{
            company.setActive(!company.isActive());
            company = this.repository.save(company);
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }


    @CrossOrigin
    @PutMapping("/company/{id}")
    public void updateJobApplicationRecord(
            @PathVariable(value = "id") Long id,
            @RequestBody Company company) {

        Company result =
                this.repository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Company not found with id " + id));

        result.setName(Objects.nonNull(company.getName()) ? company.getName() : result.getName());
        result.setName(Objects.nonNull(company.getName()) ? company.getName() : result.getName());
        result.setLogoUrl(Objects.nonNull(company.getLogoUrl()) ? company.getLogoUrl() : result.getLogoUrl());
        result.setName(Objects.nonNull(company.getName()) ? company.getName() : result.getName());
        result.setActive(Objects.nonNull(company.isActive()) ? company.isActive() : result.isActive());

        result.setUpdateAt(new Date());
        this.repository.save(result);
    }

    @CrossOrigin
    @PostMapping("/company")
    public Company createCompany(
            @RequestBody Company company) {

        company.setCreatedAt(new Date());
        company.setUpdateAt(new Date());

        return this.repository.save(company);
    }

    @CrossOrigin
    @DeleteMapping("/company/{id}")
    public void deleteCompany(@PathVariable(value = "id") Long id) {

        this.repository.deleteById(id);

    }
}
