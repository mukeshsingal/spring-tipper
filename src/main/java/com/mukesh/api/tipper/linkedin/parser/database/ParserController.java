package com.mukesh.api.tipper.linkedin.parser.database;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dto.job.ResponseMessage;
import com.mukesh.api.tipper.linkedin.parser.CompanyJobParser;
import com.mukesh.api.tipper.linkedin.parser.LinkedInJobParser;

@RestController
@RequestMapping("/api/parser/linkedin")
@CrossOrigin
public class ParserController {

    final LinkedInJobParser linkedInParser;
    final CompanyJobParser companyJobParser;

    ParserController(LinkedInJobParser linkedInParser, CompanyJobParser companyJobParser) {
        this.linkedInParser = linkedInParser;
        this.companyJobParser = companyJobParser;
    }

    @PostMapping("/byCompany/{companyName}")
    public ResponseEntity<ResponseMessage> parseJobsByCompany(@PathVariable String companyName) {
        new Thread(() -> linkedInParser.parse(companyName)).start();
        return new ResponseEntity<>(new ResponseMessage("Parsing request has been submitted for " + companyName),
                HttpStatus.OK);
    }

    @PostMapping("/lastOneDay")
    public ResponseEntity<ResponseMessage> parseJobsByCompany() {
        new Thread(linkedInParser::parseLastDay).start();
        return new ResponseEntity<>(new ResponseMessage("Parsing request has been submitted for lsat day."),
                HttpStatus.OK);
    }

    @PostMapping("/company/{companyName}")
    public ResponseEntity<ResponseMessage> parseCompany(@PathVariable String companyName) {
        new Thread(() -> companyJobParser.parse(companyName)).start();
        return new ResponseEntity<>(new ResponseMessage("Parsing request has been submitted for lsat day."),
                HttpStatus.OK);
    }
}
