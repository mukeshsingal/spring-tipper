package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.JobApplication;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.Status;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dto.job.ResponseMessage;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.JobRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/job")
public class JobController {

    final JobRepository jobRepository;

    JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping("/unstared")
    public List<JobApplication> findAll() {
        return jobRepository.getByStatusIsOrderByDatePostedDesc(Status.UNSTARED);
    }

    @GetMapping("/stared")
    public List<JobApplication> getStaredJobs() {
        return jobRepository.getByStatusIsOrderByDatePostedDesc(Status.STARED);
    }

    @GetMapping("/stats/byCompany")
    public List<Object[]> getStatsByCompany() {
        return jobRepository.countTotalJobsByCompany();
    }

    @PostMapping("/applied/{id}")
    public ResponseEntity<ResponseMessage> applyByJobId(@PathVariable String id) {
        if (jobRepository.existsByJobId(id)) {
            JobApplication application = jobRepository.findByJobId(id);
            application.setStatus(Status.STARED);
            application.setApplied(!application.isApplied());
            application.setUpdateAt(new Date());
            jobRepository.save(application);
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage(String.format("Job with id #%s successfully updated.", id)), HttpStatus.OK);
        } else {
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage(String.format("Job with id #%s doesn't exist.", id)), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteByJobId(@PathVariable String id) {
        if (jobRepository.existsByJobId(id)) {
            JobApplication application = jobRepository.findByJobId(id);
            application.setStatus(Status.REJECTED);
            application.setUpdateAt(new Date());
            jobRepository.save(application);
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " successfully deleted."), HttpStatus.OK);
        } else {
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " doesn't exist."), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save/{id}")
    public ResponseEntity<ResponseMessage> saveByJobId(@PathVariable String id) {
        if (jobRepository.existsByJobId(id)) {
            JobApplication application = jobRepository.findByJobId(id);
            application.setStatus(Status.STARED);
            application.setUpdateAt(new Date());
            jobRepository.save(application);
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " successfully saved."), HttpStatus.OK);
        } else {
            return new ResponseEntity<ResponseMessage>(
                    new ResponseMessage("Job with id #" + id + " doesn't exist."), HttpStatus.NOT_FOUND);
        }
    }

}
