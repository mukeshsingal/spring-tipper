package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;

@Repository
public interface TopicTagRepository extends CrudRepository<TopicTag, String> {

    Optional<TopicTag> findByName(String name);

}
