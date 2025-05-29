package com.mukesh.api.tipper.geeksforgeeks.parser.dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RootResponse{
    public Object previous;
    public int next;
    public int count;
    public int total;
    public int solved;
    public int unsolved;
    public ArrayList<ProblemResponse> results;
    public boolean is_logged_in;

}
