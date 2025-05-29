package com.mukesh.api.tipper.geeksforgeeks.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.JobApplication;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job.Status;

@RepositoryRestResource
public interface JobRepository extends JpaRepository<JobApplication, Long> {

    @Query("SELECT C.companyName, COUNT(C.companyName) from JobApplication as C where C.status=1 Group By C.companyName")
    List<Object[]> countTotalJobsByCompany();

    List<JobApplication> findByOrderByDatePostedDesc();

    List<JobApplication> getByStatusIsOrderByDatePostedDesc(Status status);

    JobApplication findByJobId(String id);

    List<JobApplication> findAllByStatus(Status status);

    boolean existsByJobId(String jobId);
}
