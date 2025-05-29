package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {

    List<Question> findByPracticeUrl(String url);

    List<Question> findByCompanyTags_Name(String name);

    List<Question> findByStatus(ProgressStatus status);

    List<Question> findByTopicTags_Name(String name);

    List<Question> findByIsFavourite(boolean isFavourite);

    boolean existsByTitle(String title);

    long countByTopicTags_Name(String name);

    long countByIsDeletedFalseAndTopicTags_Name(String name);

    long countByStatusIsAndTopicTags_Name(ProgressStatus status, String name);

    List<Question> findByTitle(String title);

    List<Question> findByIsDeletedAndStatus(boolean isDeleted, ProgressStatus status);

}
