package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
public class JobApplication {

    @Id
    @GeneratedValue
    private Long id;

    private String url;
    private String jobId;
    private String companyName;
    private Date datePosted;
    private String jobTitle;
    private String location;
    private String teamName;

    @Lob
    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    private Date createdAt;
    private Date updateAt;

    private Status status;

    private boolean applied = false;

    public JobApplication(String jobId, String url, String companyName) {
        this.jobId = jobId;
        this.url = url;
        this.companyName = companyName;
    }
}
