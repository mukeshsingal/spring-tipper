package com.courses.api.springboot.linkedin.parser.builders;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

//"https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=India&locationId=&geoId=102713980&f_TPR=r86400&f_JT=F&position=1&pageNum=0"

@Getter
@Setter
public class UrlBuilder {

    LinkedHashMap<String, String> queryParams = new LinkedHashMap<>();

    private String basUrl = "https://www.linkedin.com/jobs/search";
    private String keyword = "Software Engineer";
    private String location = "India";
    private String locationId = "";
    private String geoId = "102713980";
    private String position = "1";
    private String pageNum = "0";

    private UrlBuilder() {
        queryParams.put("keyword", keyword);
        queryParams.put("location", location);
        queryParams.put("locationId", locationId);
        queryParams.put("geoId", geoId);
        queryParams.put("position", position);
        queryParams.put("pageNum", pageNum);
    }

    public String getUrl() {
        ArrayList<String> result = new ArrayList<>();

        for (Map.Entry<String, String> entry : queryParams.entrySet()) {
            result.add(entry.getKey() + "=" + entry.getValue());
        }

        String query = String.join("&", result);
        return getBasUrl() + "?" + query;
    }
}


