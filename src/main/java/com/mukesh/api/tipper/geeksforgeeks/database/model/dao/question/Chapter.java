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
