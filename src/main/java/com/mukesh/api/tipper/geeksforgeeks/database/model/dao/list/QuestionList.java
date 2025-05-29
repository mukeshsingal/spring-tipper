package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.list;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Chapter;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class QuestionList {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    @Column(name = "question_list_id")
    private String id;
    private String listName;
    private String description;
    private int position;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "question_list_join", joinColumns = @JoinColumn(name = "question_list_id"), inverseJoinColumns = @JoinColumn(name = "question_id"))
    public List<Question> list;
    private ProgressStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
}
