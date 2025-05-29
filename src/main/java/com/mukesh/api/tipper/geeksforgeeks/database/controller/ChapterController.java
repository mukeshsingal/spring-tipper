package com.mukesh.api.tipper.geeksforgeeks.database.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukesh.api.tipper.geeksforgeeks.database.model.dao.question.Chapter;
import com.mukesh.api.tipper.geeksforgeeks.database.repository.ChapterRepository;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {

    final ChapterRepository chapterRepository;

    ChapterController(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    @CrossOrigin
    @GetMapping()
    public List<Chapter> getChapters() {
        return this.chapterRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(value = "/{id}", name = "Chapter By ID")
    public ResponseEntity<Chapter> getChapterById(@PathVariable String id) {

        Optional<Chapter> chapter = this.chapterRepository.findById(id);
        if (chapter.isPresent()) {
            return new ResponseEntity<>(chapter.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }

    @CrossOrigin
    @PostMapping(name = "Create new chapter")
    public Chapter createChapter(@RequestBody Chapter chapter) {
        return this.chapterRepository.save(chapter);
    }

    @CrossOrigin
    @PutMapping(value = "/{chapterId}", name = "Update chapter")
    public Chapter update(@PathVariable String chapterId, @RequestBody Chapter newChapter) {

        Chapter chapter = this.chapterRepository.findById(chapterId).get();
        chapter.setChapterName(
                newChapter.getChapterName() != null ? newChapter.getChapterName() : chapter.getChapterName());
        chapter.setModuleName(
                newChapter.getModuleName() != null ? newChapter.getModuleName() : chapter.getModuleName());
        chapter.setPosition(newChapter.getPosition() != 0 ? newChapter.getPosition() : chapter.getPosition());

        return this.chapterRepository.save(chapter);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{chapterId}", name = "Delete chapter")
    public void deleteChapter(@PathVariable String chapterId) {
        this.chapterRepository.deleteById(chapterId);
    }
}
