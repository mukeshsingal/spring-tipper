package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.JobApplication;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Status;
import com.courses.api.springboot.geeksforgeeks.database.model.dto.job.ResponseMessage;
import com.courses.api.springboot.geeksforgeeks.database.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    JobRepository jobRepository;

    @CrossOrigin
    @GetMapping("/unstared")
    public List<JobApplication> findAll() {
        return jobRepository.getByStatusIsOrderByDatePostedDesc(Status.UNSTARED);
    }

    @CrossOrigin
    @GetMapping("/stared")
    public List<JobApplication> getStaredJobs() {
        return jobRepository.getByStatusIsOrderByDatePostedDesc(Status.STARED);
    }

    @CrossOrigin
    @GetMapping("/stats/byCompany")
    public List<Object[]> getStatsByCompany() {
        return jobRepository.countTotalJobsByCompany();
    }

    @CrossOrigin
    @PostMapping("/applied/{id}")
    public ResponseEntity<ResponseMessage> applyByJobId(@PathVariable String id) {
        if (jobRepository.existsByJobId(id)) {
            JobApplication application = jobRepository.findByJobId(id);
            application.setStatus(Status.STARED);
            application.setApplied(!application.isApplied());
            application.setUpdateAt(new Date());
            jobRepository.save(application);
            return new ResponseEntity<ResponseMessage>(new ResponseMessage("Job with id #" + id + " successfully updated."), HttpStatus.OK);
        } else {
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " doesn't exist."), HttpStatus.NOT_FOUND
            );
        }
    }

    @CrossOrigin
    @PostMapping("/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteByJobId(@PathVariable String id) {
        if (jobRepository.existsByJobId(id)) {
            JobApplication application = jobRepository.findByJobId(id);
            application.setStatus(Status.REJECTED);
            application.setUpdateAt(new Date());
            jobRepository.save(application);
            return new ResponseEntity<ResponseMessage>(new ResponseMessage("Job with id #" + id + " successfully deleted."), HttpStatus.OK);
        } else {
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " doesn't exist."), HttpStatus.NOT_FOUND
            );
        }
    }

    @CrossOrigin
    @PostMapping("/save/{id}")
    public ResponseEntity<ResponseMessage> saveByJobId(@PathVariable String id) {
        if (jobRepository.existsByJobId(id)) {
            JobApplication application = jobRepository.findByJobId(id);
            application.setStatus(Status.STARED);
            application.setUpdateAt(new Date());
            jobRepository.save(application);
            return new ResponseEntity<ResponseMessage>( new ResponseMessage("Job with id #" + id + " successfully saved."), HttpStatus.OK);
        } else {
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " doesn't exist."), HttpStatus.NOT_FOUND
            );
        }
    }


}
