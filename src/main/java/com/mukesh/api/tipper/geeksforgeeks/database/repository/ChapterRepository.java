package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Chapter;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, String> {

}
