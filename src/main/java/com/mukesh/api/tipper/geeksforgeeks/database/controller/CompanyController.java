package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.Company;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dto.job.ResponseMessage;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.CompanyRepository;

@RestController
@RequestMapping("/api/company")
@CrossOrigin
public class CompanyController {

    private final CompanyRepository repository;

    CompanyController(CompanyRepository repository) {
        this.repository = repository;
    }

    @GetMapping(name = "Get all companies")
    public List<Company> getAll() {
        return this.repository.findAll();
    }

    @GetMapping(value = "/{id}", name = "Get company by ID")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Company company = this.repository.findById(id).get();
        if (company == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/active", name = "Get active companies")
    public List<Company> getAllActive() {
        return this.repository.findByActive(true);
    }

    @GetMapping(value = "/inactive", name = "Get inactive companies")
    public List<Company> getAllInActive() {
        return this.repository.findByActive(false);
    }

    @GetMapping(value = "/findByName/{name}", name = "Get by company name")
    public ResponseEntity<?> getByName(@PathVariable String name) {
        Company company = this.repository.findByName(name);

        if (company == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    @PostMapping("/{companyName}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String companyName) {

        Company company = repository.findByName(companyName);
        if (company == null) {
            return new ResponseEntity<>(new ResponseMessage("Didn't find the company record."), HttpStatus.NOT_FOUND);
        } else {
            company.setActive(!company.isActive());
            company = this.repository.save(company);
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    @PutMapping("/{id}")
    public void updateJobApplicationRecord(
            @PathVariable(value = "id") Long id,
            @RequestBody Company company) {

        Company result = this.repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id " + id));

        result.setName(Objects.nonNull(company.getName()) ? company.getName() : result.getName());
        result.setName(Objects.nonNull(company.getName()) ? company.getName() : result.getName());
        result.setLogoUrl(Objects.nonNull(company.getLogoUrl()) ? company.getLogoUrl() : result.getLogoUrl());
        result.setName(Objects.nonNull(company.getName()) ? company.getName() : result.getName());
        result.setActive(company.isActive());

        result.setUpdateAt(new Date());
        this.repository.save(result);
    }

    @PostMapping()
    public Company createCompany(
            @RequestBody Company company) {

        company.setCreatedAt(new Date());
        company.setUpdateAt(new Date());

        return this.repository.save(company);
    }

    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable(value = "id") Long id) {

        this.repository.deleteById(id);

    }
}
