package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return ResponseEntity.ok(createdFeedback);
    }

    @GetMapping("/post/{postID}")
    public ResponseEntity<List<Feedback>> getFeedbacksByPostId(@PathVariable int postID) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByPostId(postID);
        return ResponseEntity.ok(feedbacks);
    }

    @PostMapping("/{feedbackID}/like")
    public ResponseEntity<Void> likeFeedback(@PathVariable int feedbackID) {
        feedbackService.likeFeedback(feedbackID);
        return ResponseEntity.ok().build();
    }

    // Existing endpoints...

    @PutMapping("/{feedbackID}")
    public ResponseEntity<Feedback> updateFeedback(
            @PathVariable int feedbackID,
            @RequestBody Feedback feedbackDetails) {
        Feedback updatedFeedback = feedbackService.updateFeedback(feedbackID, feedbackDetails);
        return ResponseEntity.ok(updatedFeedback);
    }

    @DeleteMapping("/{feedbackID}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable int feedbackID) {
        feedbackService.deleteFeedback(feedbackID);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        List<Feedback> feedbackList = feedbackService.getAllFeedback();
        return ResponseEntity.ok(feedbackList);
    }


}
