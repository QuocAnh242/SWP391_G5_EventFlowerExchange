package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.ReviewRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Review;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/")
    public ResponseEntity<ApiResponse<Review>> createReview(@RequestBody ReviewRequest reviewRequest) {
        Review review = reviewService.createReview(reviewRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<Review>builder()
                .result(review)
                .code(1000)
                .message("Review created successfully")
                .build());
    }

    @GetMapping("/flower/{flowerID}")
    public ResponseEntity<List<Review>> getReviewsByFlowerId(@PathVariable int flowerID) {
        List<Review> reviews = reviewService.getReviewsByFlowerId(flowerID);
        return ResponseEntity.ok(reviews);
    }
}
