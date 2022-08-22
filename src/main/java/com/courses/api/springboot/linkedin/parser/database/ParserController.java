package com.courses.api.springboot.linkedin.parser.database;

import com.courses.api.springboot.geeksforgeeks.database.model.dto.job.ResponseMessage;
import com.courses.api.springboot.linkedin.parser.CompanyJobParser;
import com.courses.api.springboot.linkedin.parser.LinkedInJobParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parser")
@CrossOrigin(origins = "http://localhost:8000")
public class ParserController {

    /* ******** LINKEDIN JOBS PARSING *******  */

    @Autowired
    LinkedInJobParser linkedInParser;

    @Autowired
    CompanyJobParser companyJobParser;

    @CrossOrigin
    @PostMapping("/linkedin/byCompany/{companyName}")
    public ResponseEntity<ResponseMessage> parseJobsByCompany(@PathVariable String companyName) {
        new Thread(() -> {
            linkedInParser.parse(companyName);
        }).start();
        return new ResponseEntity<>(new ResponseMessage("Parsing request has been submitted for " + companyName), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/linkedin/lastOneDay")
    public ResponseEntity<ResponseMessage> parseJobsByCompany() {
        new Thread(() -> {
            linkedInParser.parseLastDay();
        }).start();
        return new ResponseEntity<>(new ResponseMessage("Parsing request has been submitted for lsat day."), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/linkedin/company/{companyName}")
    public ResponseEntity<ResponseMessage> parseCompany(@PathVariable String companyName) {
        new Thread(() -> {
            companyJobParser.parse(companyName);
        }).start();
        return new ResponseEntity<>(new ResponseMessage("Parsing request has been submitted for lsat day."), HttpStatus.OK);
    }
}
