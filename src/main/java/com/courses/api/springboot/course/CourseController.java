package com.courses.api.springboot.course;

import com.courses.api.springboot.topic.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @RequestMapping(method = RequestMethod.GET, value = "/topics/{topicId}/courses")
    public List<Course> getAllTopics(@PathVariable String topicId) {
        return courseService.getAllCourse(topicId);
    }

    @RequestMapping("/topics/{topicId}/courses/{courseId}")
    public Course getCourse(@PathVariable String courseId) {
        return courseService.getCourse(courseId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/topics/{topicId}/courses/")
    public void addCourse(@RequestBody Course course, @PathVariable String topicId) {
        course.setTopic(new Topic(topicId, "", ""));
        courseService.addCourse(course);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/topics/{topicId}/courses/{courseId}")
    public void updateTopic(@PathVariable String topicId, @RequestBody Course course) {
        course.setTopic(new Topic(topicId, "", ""));
        courseService.updateCourse(course);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/topics/{id}/courses/{courseId}")
    public void delete(@PathVariable String courseId) {
        courseService.delete(courseId);
    }
}
