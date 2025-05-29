package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question;

import java.util.Set;

public interface SolutionData {
    String getId();

    String getTitle();

    ProgressStatus getStatus();

    Set<TopicTagData> getTopicTags();

    String getProblemUrl();

    String getDifficultyLevel();

}
