package com.courses.api.springboot.geeksforgeeks.parser.dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SolutionUrlRequestBody {
    @NonNull
    private String solutionUrl;
}
