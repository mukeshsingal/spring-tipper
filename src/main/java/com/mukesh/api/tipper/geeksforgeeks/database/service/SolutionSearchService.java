package com.mukesh.api.tipper.geeksforgeeks.database.service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Solution;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;

@Service
public class SolutionSearchService {

    public Specification<Solution> getSeaSpecification(SolutionSearchRequestDTO filter) {
        return new Specification<Solution>() {

            @Override
            public Predicate toPredicate(Root<Solution> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Predicate predicate = criteriaBuilder.conjunction();

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("isDeleted"), false));

                if (filter.getTitle() != null) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("title"),
                            "%" + filter.getTitle().trim().toLowerCase() + "%"));
                }

                if (filter.getStatus() != null) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filter.getStatus()));
                }

                if (filter.getTopicTags() != null && !filter.getTopicTags().isEmpty()) {

                    Join<Solution, TopicTag> topicTags = root.join("topicTags");

                    Predicate inClause = topicTags.get("name").in(filter.topicTags);

                    Predicate allTagsPredicate = criteriaBuilder.and(inClause);

                    query.groupBy(root.get("id"));
                    query.having(criteriaBuilder.equal(criteriaBuilder.count(topicTags.get("id")),
                            filter.getTopicTags().size()));

                    predicate = criteriaBuilder.and(predicate, allTagsPredicate);
                }
                return predicate;
            }
        };
    }

}
