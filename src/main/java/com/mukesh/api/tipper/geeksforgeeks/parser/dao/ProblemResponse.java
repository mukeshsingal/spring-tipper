package com.mukesh.api.tipper.geeksforgeeks.parser.dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProblemResponse {
    public int id;
    public String problem_name;
    public int problem_type;
    public int problem_level;
    public String slug;
    public String accuracy;
    public int all_submissions;
    public int marks;
    public String difficulty;
    public int content_type;
    public String problem_url;
    public Object topic_order;
    public int solved_status;
}
