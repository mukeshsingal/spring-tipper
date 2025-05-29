package com.mukesh.api.tipper.geeksforgeeks.parser;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Question;
import com.mukesh.api.tipper.geeksforgeeks.parser.impl.ParserFactory;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class GfGMustDoPageParser {

    private GfGMustDoPageParser() {
    }

    public static Map<String, List<Question>> getMustDoCodingQuestions(String mainPageUrl) {

        HashMap<String, List<Question>> questionsByCompanyName = new HashMap<>();
        Map<String, List<String>> questionsUrlsByCompany = getQuestionUrlsCompanyWise(mainPageUrl);

        questionsUrlsByCompany.forEach((companyName, questionUrls) -> {
            List<Question> questions = new ArrayList<>();
            questionUrls.forEach(url -> {
                log.info("Processing " + companyName + " : " + url);
                questions.add(ParserFactory.getQuestionParser(url).parseQuestion(url));
            });
            questionsByCompanyName.put(companyName, questions);
        });

        return questionsByCompanyName;
    }

    public static Map<String, List<String>> getQuestionUrlsCompanyWise(String mainPageUrl) {

        HashMap<String, List<String>> questionsByCompany = new HashMap<>();
        try {
            Document document = Jsoup.connect(mainPageUrl).get();
            Element element = document.getElementsByClass("entry-content").first();
            Elements elements = element.children();

            for (int i = 3; i < elements.size(); i++) {
                List<String> companyList = new ArrayList<>();

                Element e = elements.get(i);
                String companyName = nextCompanyNameExist(elements, i);

                if (companyName == null)
                    break;

                while (e.nodeName() != "ol" && i < elements.size()) {
                    e = elements.get(i);
                    i++;
                }

                if (i < elements.size()) {
                    Elements links = e.children();
                    links.forEach(l -> {
                        companyList.add(l.child(0).attr("href"));
                    });
                }

                i++;

                questionsByCompany.put(companyName, companyList);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return questionsByCompany;
    }

    private static String nextCompanyNameExist(Elements elements, int i) {
        for (int j = i; j < elements.size(); j++) {
            Element e = elements.get(i);
            if ("p".equals(e.nodeName()) && e.children().isEmpty()) {
                return e.text();
            }
        }
        return null;
    }

}
