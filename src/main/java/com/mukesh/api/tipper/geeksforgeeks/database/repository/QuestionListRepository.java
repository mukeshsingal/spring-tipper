package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.list.QuestionList;

@Repository
public interface QuestionListRepository extends JpaRepository<QuestionList, String> {
    List<QuestionList> findByChapter_ChapterNameOrderByPositionAsc(String chapterName);
}
