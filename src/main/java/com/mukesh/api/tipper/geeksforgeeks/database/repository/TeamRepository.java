package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.Team;

@RepositoryRestResource
public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findAllByCompanyName(String companyName);

}
