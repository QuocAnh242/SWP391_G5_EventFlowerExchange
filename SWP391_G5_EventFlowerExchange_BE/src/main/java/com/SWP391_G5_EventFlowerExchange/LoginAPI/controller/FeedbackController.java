package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping("/{userID}/{postID}")
    public ResponseEntity<ApiResponse<Feedback>> createFeedback(
            @PathVariable int userID,
            @PathVariable int postID,
            @RequestBody String content) {
        Feedback feedback = feedbackService.createFeedback(userID, postID, content);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<Feedback>builder()
                        .result(feedback)
                        .code(1000)
                        .message("Feedback created successfully")
                        .build());
    }

    @GetMapping("/{postID}")
    public ResponseEntity<List<Feedback>> getFeedbackByPostID(@PathVariable int postID) {
        List<Feedback> feedbacks = feedbackService.getFeedbackByPostID(postID);
        return ResponseEntity.ok(feedbacks);
    }
}
