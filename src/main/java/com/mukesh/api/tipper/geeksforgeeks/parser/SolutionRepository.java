package com.mukesh.api.tipper.geeksforgeeks.parser;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Solution;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.SolutionData;

import th.co.geniustree.springdata.jpa.repository.JpaSpecificationExecutorWithProjection;

@Repository
public interface SolutionRepository extends PagingAndSortingRepository<Solution, String>, JpaSpecificationExecutorWithProjection<Solution> {

    List<SolutionData> findByStatus(ProgressStatus status);

    List<Solution> findByTitleContaining(String title);

    List<Solution> findByTopicTags_Name(String name);

    List<Solution> findByIsFavourite(boolean isFavourite);

    boolean existsByTitle(String title);

    long countByTopicTags_Name(String name);

    long countByIsDeletedFalseAndTopicTags_Name(String name);

    long countByStatusIsAndTopicTags_Name(ProgressStatus status, String name);

    List<Solution> findByTitle(String title);

    List<SolutionData> findByIsDeletedAndStatusAndProblemUrlIsNotNull(boolean isDeleted, ProgressStatus status, Pageable pageable);

    List<SolutionData> findByIsDeletedAndStatus(boolean isDeleted, ProgressStatus status);

    List<Solution> findByProblemUrlIsNotNull();

}
