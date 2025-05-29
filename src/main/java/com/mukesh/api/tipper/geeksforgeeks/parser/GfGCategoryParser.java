package com.mukesh.api.tipper.geeksforgeeks.parser;

import com.mukesh.api.tipper.geeksforgeeks.parser.dao.SolutionContent;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class GfGCategoryParser {
    public static List<SolutionContent> getAllLinks(String url) {
        try {
            Document document = null;
            List<SolutionContent> solutions = new ArrayList<>();

            boolean hasNext = false;
            do {
                System.out.println(url);
                document = Jsoup.connect(url).get();
                Element element = document.getElementsByClass("popular_articles").first();
                Elements elements = element.children();

                for (int i = 0; i < elements.size(); i++) {

                    Elements articleContent = elements.get(i).getElementsByClass("article_subheading");
                    if(!articleContent.isEmpty()) {

                        SolutionContent solutionContent = new SolutionContent();

                        solutionContent.setUrl(articleContent.get(0).child(0).attr("href"));
                        solutionContent.setHeading(articleContent.get(0).child(0).text());

                        articleContent = elements.get(i).getElementsByClass("article_date");
                        if(!articleContent.isEmpty()) {
                            String date = articleContent.get(0).text(); //Last Updated: 30 March 2024
                            date = date.replace("Last Updated:", "").trim();

                            SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");
                            solutionContent.setCreatedDate(dateFormat.parse(date));
                        }

                        Set<String> tagList = new HashSet<>();
                        Elements tags = elements.get(i).getElementsByClass("article_tag");
                        tags.forEach(tag -> {
                            tagList.add(tag.text());
                        });
                        solutionContent.setTags(tagList);
                        solutions.add(solutionContent);
                    }


                }

                hasNext = !document.getElementsByClass("skip_option").isEmpty();
                if(hasNext)
                    url = document.getElementsByClass("skip_option").get(0).attr("href");

            } while (hasNext);

            return solutions;

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }
}
