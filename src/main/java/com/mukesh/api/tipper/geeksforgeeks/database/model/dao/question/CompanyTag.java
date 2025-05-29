package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@Table(name = "CompanyTagTable")
@Getter
@Setter
public class CompanyTag {
    @Id
    @Column(name = "company_id")
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    private String name;

    public CompanyTag(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
