package com.courses.api.springboot.geeksforgeeks.database.model.dao.job;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
public class JobApplication {

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

    @Id
    @GeneratedValue
    private Long id;

    public JobApplication(String jobId, String url, String companyName) {
        this.jobId = jobId;
        this.url = url;
        this.companyName = companyName;
    }
}
