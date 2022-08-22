package com.courses.api.springboot.geeksforgeeks.database.repository;



import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.JobApplication;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

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
