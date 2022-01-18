package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Chapter;
import com.courses.api.springboot.geeksforgeeks.database.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//TODO: We can have request mapping at class level also
public class ChapterController {

    private static final String CHAPTER_ROOT = "/api/chapters";
    @Autowired
    ChapterRepository chapterRepository;

    @CrossOrigin
    @GetMapping(CHAPTER_ROOT)
    public List<Chapter> getChapters() {
        return this.chapterRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(CHAPTER_ROOT + "/{id}")
    public ResponseEntity<Chapter> getChapterById(@PathVariable String id) {

        Optional<Chapter> chapter= this.chapterRepository.findById(id);
        if(chapter.isPresent()) {
            return  new ResponseEntity<>(chapter.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }


    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value = CHAPTER_ROOT)
    public Chapter createChapter(@RequestBody Chapter chapter) {
        return this.chapterRepository.save(chapter);
    }


    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value = CHAPTER_ROOT + "/{chapterId}")
    public Chapter update(@PathVariable String chapterId, @RequestBody Chapter newChapter) {

        Chapter chapter = this.chapterRepository.findById(chapterId).get();

        chapter.setChapterName(newChapter.getChapterName() != null ? newChapter.getChapterName() : chapter.getChapterName());
        chapter.setModuleName(newChapter.getModuleName() != null ? newChapter.getModuleName() : chapter.getModuleName());
        chapter.setPosition(newChapter.getPosition() != 0 ? newChapter.getPosition() : chapter.getPosition());

        return this.chapterRepository.save(chapter);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.DELETE, value = CHAPTER_ROOT + "/{id}")
    public void deleteChapter(@PathVariable String chapterId) {
        this.chapterRepository.deleteById(chapterId);
    }
}
