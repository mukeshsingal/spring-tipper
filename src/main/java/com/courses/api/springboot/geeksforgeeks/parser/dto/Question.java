package com.courses.api.springboot.geeksforgeeks.parser.dto;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "QuestionTable")
public class Question {
    public Question() {
    }


    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    @Column(name = "question_id")
    private String id;
    private String title;
    private String description;
    private String questionRating;
    private String difficultyLevel;
    private String url;

    private String status;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "company_tag_join",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "company_id")
    )
    private Set<CompanyTag> companyTags;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })

    @JoinTable(name = "topic_tag_join",
            joinColumns ={ @JoinColumn(name = "question_id")},
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<TopicTag> topicTags;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQuestionRating() {
        return questionRating;
    }

    public void setQuestionRating(String questionRating) {
        this.questionRating = questionRating;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<CompanyTag> getCompanyTags() {
        return companyTags;
    }

    public void setCompanyTags(Set<CompanyTag> companyTags) {
        this.companyTags = companyTags;
    }

    public Set<TopicTag> getTopicTags() {
        return topicTags;
    }

    public void setTopicTags(Set<TopicTag> topicTags) {
        this.topicTags = topicTags;
    }

}
