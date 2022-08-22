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
