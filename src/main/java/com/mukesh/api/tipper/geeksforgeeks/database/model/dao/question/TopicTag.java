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

@Entity
@Table(name = "TopicTagTable")
@Getter
@Setter
@NoArgsConstructor
public class TopicTag {

    public TopicTag(String name) {
        this.name = name;
    }

    @Id
    @Column(name = "tag_id")
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    private String name;

    @Override
    public String toString() {
        return name;
    }
}
