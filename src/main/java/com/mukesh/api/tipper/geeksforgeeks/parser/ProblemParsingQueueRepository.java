package com.mukesh.api.tipper.geeksforgeeks.parser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemParsingQueueRepository extends JpaRepository<ProblemParsingQueue, String> {

    boolean existsByUrl(String url);

    ProblemParsingQueue findFirstByParsingDoneIsFalse();

}
