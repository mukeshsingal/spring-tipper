package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * {
 * "id": 714264,
 * "problem_name": "Find Number",
 * "problem_type": 1,
 * "problem_level": 1,
 * "slug": "35bff0ee40090b092e97b02f649085bf1390cc67",
 * "accuracy": "56.78%",
 * "all_submissions": 21410,
 * "marks": 4,
 * "difficulty": "Medium",
 * "tags": {
 * "company_tags": [],
 * "topic_tags": [
 * "Mathematical",
 * "Algorithms"
 * ]
 * },
 * "content_type": 1,
 * "problem_url":
 * "https://practice.geeksforgeeks.org/problems/35bff0ee40090b092e97b02f649085bf1390cc67/1",
 * "topic_order": null,
 * "solved_status": 0
 * },
 */

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "QuestionTable")
@ToString
public class Question {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(name = "question_id")
    private String id;
    private String title;
    private String difficultyLevel;
    private String problemUrl;
    private String practiceUrl;
    private int marks;

    private ProgressStatus status;

    @Lob
    @Column(name = "problemDescription", columnDefinition = "MEDIUMTEXT")
    private String problemDescription;
    @Lob
    @Column(name = "solutionDescription", columnDefinition = "MEDIUMTEXT")
    private String solutionDescription;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "company_tag_join", joinColumns = @JoinColumn(name = "question_id"), inverseJoinColumns = @JoinColumn(name = "company_id"))
    private Set<CompanyTag> companyTags;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "topic_tag_join", joinColumns = {
            @JoinColumn(name = "question_id") }, inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<TopicTag> topicTags;

    private Date created;
    private Date updated;

    private boolean isDeleted;
    private boolean isFavourite;

}
