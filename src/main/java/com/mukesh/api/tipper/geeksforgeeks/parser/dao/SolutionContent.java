package com.mukesh.api.tipper.geeksforgeeks.parser.dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class SolutionContent {
    public String heading;
    public Date createdDate;
    public Set<String> tags;
    public String url;

    @Override
    public String toString() {
        return url;
    }
}
