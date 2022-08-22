package com.courses.api.springboot.geeksforgeeks.database.repository;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Company findByName(String name);

    List<Company> findByActive(boolean active);

    boolean existsByName(String name);


    

}
