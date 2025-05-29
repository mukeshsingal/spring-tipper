package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.job;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
