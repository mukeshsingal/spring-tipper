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
public class Company {

    String name;
    String logoUrl;
    String companyUrl;
    String careerPageUrl;
    String industry;
    String location;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    Date createdAt;
    Date updateAt;

    boolean active;

    @Id
    @GeneratedValue
    private Long id;

    public Company(String name) {
        this.name = name;
    }
}
