package com.courses.api.springboot.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    List<Topic> topics  = new ArrayList<>(Arrays.asList(
            new Topic("Spring", "Spring Frameworks", "Spring Frameworks description"),
                new Topic("Java", "Java", "Java description"),
                new Topic("JavaScript", "JavaScript Language", "JavaScript description")
        ));

    public List<Topic> getAllTopics() {
        //return topics;
        List<Topic> topics = new ArrayList<>();
        topicRepository.findAll().forEach(topics::add);
        return topics;
    }

    public Topic getTopic(String id) {
        //return topics.stream().filter(topic -> topic.getId().equals(id)).findFirst().get();
        return topicRepository.findById(id).get();
    }

    public void addTopic(Topic topic) {
        //this.topics.add(topic);
        topicRepository.save(topic);
    }

    public void updateTopic(String id, Topic topic) {
        topicRepository.save(topic);

        /*Topic oldTopic = topics.stream().filter(t -> t.getId().equals(id)).findFirst().get();
        topics.remove(oldTopic);
        topics.add(topic);*/
    }

    public void delete(String id) {
        topicRepository.deleteById(id);

        /*Topic oldTopic = topics.stream().filter(t -> t.getId().equals(id)).findFirst().get();
        topics.remove(oldTopic);*/
    }
}
