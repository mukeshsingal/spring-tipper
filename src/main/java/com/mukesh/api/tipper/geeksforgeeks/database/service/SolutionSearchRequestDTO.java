package com.mukesh.api.tipper.geeksforgeeks.database.service;

import java.util.Set;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SolutionSearchRequestDTO {
    String title;
    Set<String> topicTags;
    int limit;
    ProgressStatus status;
    String hasPracticeUrl;
    boolean isDeleted;
}
