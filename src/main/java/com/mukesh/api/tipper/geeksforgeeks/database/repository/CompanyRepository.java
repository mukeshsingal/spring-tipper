package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.Company;

@RepositoryRestResource
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Company findByName(String name);

    List<Company> findByActive(boolean active);

    boolean existsByName(String name);

}
