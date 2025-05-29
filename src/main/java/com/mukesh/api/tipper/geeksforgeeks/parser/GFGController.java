package com.mukesh.api.tipper.geeksforgeeks.parser;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.ProgressStatus;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Solution;
import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.TopicTag;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.QuestionRepository;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.TopicTagRepository;
import com.mukesh.api.tipper.geeksforgeeks.parser.dao.SolutionContent;
import com.mukesh.api.tipper.geeksforgeeks.parser.dao.SolutionUrlRequestBody;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class GFGController {

    final GfgProblemsParsers parser;
    public final QuestionRepository questionRepository;
    public final TopicTagRepository topicTagRepository;
    public final SolutionRepository solutionRepository;
    

    GFGController(GfgProblemsParsers parser, QuestionRepository questionRepository,
            TopicTagRepository topicTagRepository, SolutionRepository solutionRepository) {
        this.parser = parser;
        this.questionRepository = questionRepository;
        this.topicTagRepository = topicTagRepository;
        this.solutionRepository = solutionRepository;
    }

    @CrossOrigin
    @GetMapping("/questions/all")
    public Map<String, List<Question>> getMustDoCodingQuestions() {
        return GfGMustDoPageParser.getMustDoCodingQuestions(GfgConstants.MUST_DO_CODING_QUESTIONS_HOME_URL);
    }

    @CrossOrigin
    @GetMapping("/solutions/setdiff")
    public void getProblemLinks() {

        solutionRepository.findByProblemUrlIsNotNull().forEach(solution -> {
            List<Question> byPracticeUrl = questionRepository.findByPracticeUrl(solution.getProblemUrl());
            if (!byPracticeUrl.isEmpty()) {
                solution.setDifficultyLevel(byPracticeUrl.get(0).getDifficultyLevel());
                solutionRepository.save(solution);
            }
        });
    }

    @CrossOrigin
    @PostMapping("/api/parsers/category")
    public void parseCategories(@RequestBody SolutionUrlRequestBody body) {
        List<SolutionContent> allLinks = GfGCategoryParser.getAllLinks(body.getSolutionUrl());
        AtomicInteger count = new AtomicInteger(1);
        allLinks.stream().forEach(article -> {
            log.info(count + "/" + allLinks.size() + " " + article.heading);
            count.getAndIncrement();
            if (!solutionRepository.existsByTitle(article.heading)) {
                Solution solution = new Solution();
                solution.setArticleDate(article.getCreatedDate());
                solution.setTitle(article.heading);
                solution.setUrl(article.url);

                Set<String> tags = article.getTags();

                Set<TopicTag> topicTags1 = tags.stream().map(topicTag -> {
                    Optional<TopicTag> byName = topicTagRepository.findByName(topicTag);
                    if (byName.isPresent()) {
                        return byName.get();
                    } else {
                        return new TopicTag(topicTag);
                    }
                }).collect(Collectors.toSet());
                solution.setTopicTags(topicTags1);
                Document webDocument = SolutionParser.getWebDocument(article.url);
                solution.setProblemUrl(SolutionParser.getProblemLink(webDocument));
                String solutionDescription = SolutionParser.getSolutionDescription(webDocument);
                solution.setSolutionDescription(solutionDescription);
                solution.setCreated(new Date());
                solution.setUpdated(new Date());
                solution.setStatus(ProgressStatus.NOT_DONE);

                solutionRepository.save(solution);
            } else {
                log.info("Ignored");
            }
        });
    }

    @CrossOrigin
    @PostMapping("/api/parsers/parse-solution/{questionId}")
    public Question getAllQuestionUrls(@RequestBody SolutionUrlRequestBody body, @PathVariable String questionId) {
        Question dbQuestion = questionRepository.findById(questionId).get();
        dbQuestion.setSolutionDescription(
                SolutionParser.getSolutionDescription(SolutionParser.getWebDocument(body.getSolutionUrl())));
        dbQuestion.setProblemUrl(body.getSolutionUrl());
        questionRepository.save(dbQuestion);
        return dbQuestion;
    }

    @CrossOrigin
    @PostMapping("/api/parser/parse-gfg-problems")
    public ResponseEntity<String> parseAllPracticeQuestions() {
        try {
            parser.start();
            return ResponseEntity.ok("Parsing is successful. Check logs for more details");
        } catch (Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Exception occurred while executing the request" + ex.getMessage());
        }

    }

    // @CrossOrigin
    // @PostMapping("/question")
    // public Question getQuestion(@RequestBody ParseRequestBody postRequestBody) {
    // Question question =
    // GfgProblemsParsers.parseQuestion(postRequestBody.getUrl());
    // this.gfgRepository.save(question);
    // return question;
    // }

}
