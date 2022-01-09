package com.courses.api.springboot.geeksforgeeks.database.model.dao.list;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Chapter;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.TopicTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

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

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "question_list_join", joinColumns = @JoinColumn(name = "question_list_id"), inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<Question> list;
    private ProgressStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
}
