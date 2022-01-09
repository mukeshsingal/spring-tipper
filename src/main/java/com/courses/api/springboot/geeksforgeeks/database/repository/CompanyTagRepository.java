package com.courses.api.springboot.geeksforgeeks.database.repository;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.CompanyTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyTagRepository extends CrudRepository<CompanyTag, String> {

    Optional<CompanyTag> findByName(String name);
}
