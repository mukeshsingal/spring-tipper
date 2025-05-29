package com.mukesh.api.tipper.geeksforgeeks.parser;

import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.CompanyTag;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.CompanyTagRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.TopicTagRepository;
import com.mukesh.api.tipper.geeksforgeeks.parser.dao.ProblemResponse;
import com.mukesh.api.tipper.geeksforgeeks.parser.dao.RootResponse;
import com.mukesh.api.tipper.geeksforgeeks.parser.impl.BaseParser;
import com.mukesh.api.tipper.geeksforgeeks.parser.impl.ParserFactory;
import com.mukesh.api.tipper.library.SeleniumHelper;

import lombok.extern.slf4j.Slf4j;

/**
 * This classic primarily fetch and parse questions listed under the page
 * https://practice.geeksforgeeks.org/explore?page=41&sortBy=submissions
 */
@Component
@Slf4j
public class GfgProblemsParsers {

    public final WebDriver driver;
    public final SeleniumHelper helper;

    final ProblemParsingQueueRepository repository;
    final TopicTagRepository topicTagRepository;
    final CompanyTagRepository companyTagRepository;

    final QuestionRepository questionRepo;

    public GfgProblemsParsers(WebDriver driver, SeleniumHelper helper, ProblemParsingQueueRepository repository,
            TopicTagRepository topicTagRepository, CompanyTagRepository companyTagRepository,
            QuestionRepository questionRepo) {
        this.driver = driver;
        this.helper = helper;
        this.repository = repository;
        this.topicTagRepository = topicTagRepository;
        this.companyTagRepository = companyTagRepository;
        this.questionRepo = questionRepo;
    }

    /**
     * Public method to extract all the links from the problem home page
     */
    public void start() {
        // findAllQuestionsFromHomePage();
        processQueue();
    }

    public void processQueue() {
        for (int i = 0; i < 500; i++) {
            ProblemParsingQueue queueEntry = repository.findFirstByParsingDoneIsFalse();

            String url = queueEntry.getUrl();
            Question question = GfgProblemsParsers.parseQuestion(url);

            Set<TopicTag> topicTags = question.getTopicTags();
            Set<TopicTag> topicTags1 = topicTags.stream().map(topicTag -> {
                Optional<TopicTag> byName = topicTagRepository.findByName(topicTag.getName());
                if (byName.isPresent()) {
                    return byName.get();
                } else {
                    return topicTag;
                }
            }).collect(Collectors.toSet());
            question.setTopicTags(topicTags1);

            Set<CompanyTag> collect = question.getCompanyTags().stream().map(companyTag -> {
                Optional<CompanyTag> byName = companyTagRepository.findByName(companyTag.getName());
                if (byName.isPresent()) {
                    return byName.get();
                } else {
                    return companyTag;
                }
            }).collect(Collectors.toSet());
            question.setCompanyTags(collect);
            question.setCreated(new Date());
            question.setUpdated(new Date());

            Question savedQuestion = questionRepo.save(question);

            if (savedQuestion != null) {
                queueEntry.setParsingDone(true);
                repository.save(queueEntry);
            }
        }

    }

    /**
     * It will only fetch and save the URL to the parsing QUEUE
     */
    private void findAllQuestionsFromHomePage() {
        try {
            int count = 0;
            int nextPage = 0;
            WebClient webClient = WebClient.create("https://practiceapi.geeksforgeeks.org");

            RootResponse response = webClient.get().uri("/api/vr/problems/?pageMode=explore&page=1&sortBy=latest")
                    .retrieve()
                    .bodyToMono(RootResponse.class)
                    .block();
            count += response.count;
            nextPage = response.next;
            saveUrls(response);

            while (count < response.total) {
                response = webClient.get().uri("/api/vr/problems/?pageMode=explore&page=" + nextPage + "&sortBy=latest")
                        .retrieve()
                        .bodyToMono(RootResponse.class)
                        .block();
                saveUrls(response);
                count += response.count;
                nextPage = response.next;
            }
        } catch (Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
        }
    }

    private void saveUrls(RootResponse response) {
        for (ProblemResponse problemResponse : response.results) {
            String url = problemResponse.problem_url;
            if (!repository.existsByUrl(url)) {
                repository.save(new ProblemParsingQueue(url));
                log.info("Saved : " + url);
            } else {
                log.info("Skipped : " + url);
            }
        }
    }

    public static Question parseQuestion(String questionUrl) {
        BaseParser parser = ParserFactory.getQuestionParser(questionUrl);
        return parser.parseQuestion(questionUrl);
    }
}
