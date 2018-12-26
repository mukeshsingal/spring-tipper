package com.courses.api.springboot.geeksforgeeks.parser;

import com.courses.api.springboot.geeksforgeeks.parser.dto.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GfgRepository extends CrudRepository<Question, String> {
}
