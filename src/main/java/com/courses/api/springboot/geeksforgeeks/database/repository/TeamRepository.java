package com.courses.api.springboot.geeksforgeeks.database.repository;



import java.util.List;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findAllByCompanyName(String companyName);

}
