package com.courses.api.springboot.geeksforgeeks.database.model.dto.job;


import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Company;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.JobApplication;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.job.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Setter
@Getter
public class JobApplicationDTO {

    private Long id;
    private String url;
    private String jobId;
    private String companyName;
    private Date datePosted;
    private String jobTitle;
    private String location;
    private String teamName;

    private String logoUrl;
    private String jobDescription;

    private Date createdAt;
    private Date updateAt;

    private Status status;

    public void setCompany(Company company) {
        this.setLogoUrl(company.getLogoUrl());
    }

    public static JobApplicationDTO generate(JobApplication application) {

        JobApplicationDTO dto = new JobApplicationDTO();

        dto.setId(application.getId());
        dto.setJobId(application.getJobId());
        dto.setCompanyName(application.getCompanyName());
        dto.setDatePosted(application.getDatePosted());
        dto.setJobTitle(application.getJobTitle());
        dto.setLocation(application.getLocation());
        dto.setTeamName(application.getTeamName());
        dto.setJobDescription(application.getJobDescription());
        dto.setCreatedAt(application.getCreatedAt());
        dto.setUpdateAt(application.getUpdateAt());
        dto.setStatus(application.getStatus());

        return dto;
    }
}
