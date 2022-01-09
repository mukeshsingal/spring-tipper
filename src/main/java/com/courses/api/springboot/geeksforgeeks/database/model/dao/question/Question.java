package com.courses.api.springboot.geeksforgeeks.database.model.dao.question;


import com.courses.api.springboot.geeksforgeeks.database.model.dao.list.QuestionList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "QuestionTable")
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
    private ProgressStatus status;

    @Lob
    @Column(name = "problemDescription", columnDefinition = "MEDIUMTEXT")
    private String problemDescription;
    @Lob
    @Column(name = "solutionDescription", columnDefinition = "MEDIUMTEXT")
    private String solutionDescription;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "company_tag_join", joinColumns = @JoinColumn(name = "question_id"), inverseJoinColumns = @JoinColumn(name = "company_id"))
    private Set<CompanyTag> companyTags;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "topic_tag_join", joinColumns = {@JoinColumn(name = "question_id")}, inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<TopicTag> topicTags;

    private Date created;
    private Date updated;

    private boolean isDeleted;

    private boolean isFavourite;


}
