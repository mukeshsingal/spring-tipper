package com.mukesh.api.tipper.geeksforgeeks.parser;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Solution;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.SolutionData;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.service.SolutionSearchRequestDTO;
import com.mukesh.api.tipper.geeksforgeeks.database.service.SolutionSearchService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/solutions")
public class SolutionController {
    public final SolutionRepository solutionRepository;

    public final QuestionRepository questionRepository;

    public final SolutionSearchService searchService;

    SolutionController(SolutionRepository solutionRepository, QuestionRepository questionRepository, SolutionSearchService searchService) {
        this.solutionRepository = solutionRepository;
        this.questionRepository = questionRepository;
        this.searchService = searchService;
    }

    @PostMapping("/search")
    public Page<SolutionData> getSolutions(
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "50") int pageSize,
            @RequestBody SolutionSearchRequestDTO searchRequest) {

            log.info("Page number is {}", pageNumber);
            log.info("Page size is {}", pageSize);
            log.info("Page Request is {}", searchRequest);

            Specification<Solution> seaSpecification = searchService.getSeaSpecification(searchRequest);

            Sort sort = "ASC".equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by("title").ascending() : Sort.by("title").descending();
            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

            return solutionRepository.findAll(seaSpecification, SolutionData.class, pageable);
    }

    @CrossOrigin
    @GetMapping("/completed")
    public List<SolutionData> getCompletedSolutions() {
        return solutionRepository.findByIsDeletedAndStatus(false, ProgressStatus.DONE).stream().toList();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Solution getSolution(@PathVariable String id) {
        return solutionRepository.findById(id).get();
    }

    @CrossOrigin
    @PutMapping("/{id}/done")
    public Solution markSolutionDone(@PathVariable String id) {
        Solution solution = solutionRepository.findById(id).get();
        if (solution.getStatus() == ProgressStatus.DONE) {
            solution.setStatus(ProgressStatus.NOT_DONE);
        } else {
            solution.setStatus(ProgressStatus.DONE);
        }
        solutionRepository.save(solution);
        return solution;
    }

    @CrossOrigin
    @PutMapping("/{id}/favourite")
    public Solution markFavorite(@PathVariable String id) {
        Solution solution = solutionRepository.findById(id).get();
        solution.setFavourite(!solution.isFavourite());
        solutionRepository.save(solution);
        return solution;
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public Solution deleteSolution(@PathVariable String id) {
        Solution solution = solutionRepository.findById(id).get();
        solution.setDeleted(!solution.isDeleted());
        solutionRepository.save(solution);
        return solution;
    }

    @CrossOrigin
    @GetMapping("/markallexp/{text}")
    public void markExpDeleted(@PathVariable String text) {
        List<Solution> experience = solutionRepository.findByTitleContaining("interview").stream().map(a -> {
            a.setDeleted(true);
            return a;
        }).toList();
        solutionRepository.saveAll(experience);
    }
}
