package com.courses.api.springboot.geeksforgeeks.database.repository;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TopicTagRepository extends CrudRepository<TopicTag, String> {

    Optional<TopicTag> findByName(String name);
}
