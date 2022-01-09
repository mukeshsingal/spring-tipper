package com.courses.api.springboot.geeksforgeeks.database.repository;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {

    List<Question> findByCompanyTags_Name(String name);

    List<Question> findByTopicTags_Name(String name);

    List<Question> findByIsFavourite(boolean isFavourite);

    boolean existsByTitle(String title);

    List<Question> findByTitle(String title);

    List<Question> findByIsDeleted(boolean isDeleted);



}
