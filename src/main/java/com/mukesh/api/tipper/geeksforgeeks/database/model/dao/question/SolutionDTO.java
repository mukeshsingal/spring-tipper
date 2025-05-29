package com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SolutionDTO {
    String id;
    String title;
    ProgressStatus status;
    String[] topicTags;

    public static SolutionDTO getInstance(SolutionData data) {
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setId(data.getId());
        solutionDTO.setStatus(data.getStatus());
        solutionDTO.setTitle(data.getTitle());
        String[] t = new String[data.getTopicTags().size()];
        int i = 0;
        for (TopicTagData tt : data.getTopicTags()) {
            t[i++] = tt.getName();
        }
        solutionDTO.setTopicTags(t);
        return solutionDTO;
    }

}
