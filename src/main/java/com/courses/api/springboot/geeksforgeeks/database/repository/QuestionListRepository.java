package com.courses.api.springboot.geeksforgeeks.database.repository;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.list.QuestionList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionListRepository extends JpaRepository<QuestionList, String> {
    List<QuestionList> findByChapter_ChapterNameOrderByPositionAsc(String chapterName);
}
