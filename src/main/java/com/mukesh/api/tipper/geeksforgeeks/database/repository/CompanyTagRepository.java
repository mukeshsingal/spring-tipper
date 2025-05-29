package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;

@Repository
public interface CompanyTagRepository extends CrudRepository<CompanyTag, String> {

    Optional<CompanyTag> findByName(String name);
}
