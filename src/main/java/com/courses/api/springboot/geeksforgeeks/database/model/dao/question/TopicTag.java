package com.courses.api.springboot.geeksforgeeks.database.model.dao.question;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

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
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid2")
    private String id;

    private String name;

    @Override
    public String toString() {
        return name;
    }
}
