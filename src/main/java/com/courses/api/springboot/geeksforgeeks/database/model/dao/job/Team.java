package com.courses.api.springboot.geeksforgeeks.database.model.dao.job;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue
    private Long id;

    String teamName;
    String companyName;

    private Date createdAt;
    private Date updatedAt;
}
