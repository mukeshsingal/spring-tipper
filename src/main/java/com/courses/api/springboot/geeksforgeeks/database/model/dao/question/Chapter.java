package com.courses.api.springboot.geeksforgeeks.database.model.dao.question;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


@Entity
@Table(name = "ChapterTable")
@Getter
@Setter
@NoArgsConstructor
public class Chapter {

    public Chapter(String chapterName) {
        this.chapterName = chapterName;
    }

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(name = "chapter_id")
    private String id;

    private int position;
    private String moduleName;
    private String chapterName;

    @Override
    public String toString() {
        return chapterName;
    }
}
