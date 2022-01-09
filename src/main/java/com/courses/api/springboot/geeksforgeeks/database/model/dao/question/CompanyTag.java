package com.courses.api.springboot.geeksforgeeks.database.model.dao.question;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

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
