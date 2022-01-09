package com.courses.api.springboot.geeksforgeeks.database.repository;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Chapter;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, String> {





}
