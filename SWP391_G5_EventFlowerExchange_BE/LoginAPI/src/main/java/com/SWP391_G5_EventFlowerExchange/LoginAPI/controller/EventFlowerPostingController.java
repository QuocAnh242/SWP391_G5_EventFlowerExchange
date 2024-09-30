package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.EventFlowerPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/post")
public class EventFlowerPostingController {
    @Autowired
    private EventFlowerPostingService eventFlowerPostingService;
    @GetMapping("/")
    public ResponseEntity<List<EventFlowerPosting>> fetchAll(){
        return ResponseEntity.ok(eventFlowerPostingService.getAllEventPostings());
    }
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public EventFlowerPosting savePost(@RequestBody EventFlowerPosting postId) {
        return eventFlowerPostingService.insertEventFlowerPosting(postId);//201 CREATED
    }
    @PutMapping("/{id}")
    public ResponseEntity<EventFlowerPosting> updatePostId(@PathVariable int postId, @RequestBody EventFlowerPosting post) {
        EventFlowerPosting updatedPostId = eventFlowerPostingService.updateEventFlowerPosting(postId, post);
        return ResponseEntity.ok(updatedPostId);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id) {
        eventFlowerPostingService.deleteEventFlowerPosting(id);
        return ResponseEntity.ok("Deleted!");
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<EventFlowerPosting>> getPostById(@PathVariable int id) {
        Optional<EventFlowerPosting> post= eventFlowerPostingService.getEventFlowerPostingById(id);
        return ResponseEntity.ok(post);
    }
}
