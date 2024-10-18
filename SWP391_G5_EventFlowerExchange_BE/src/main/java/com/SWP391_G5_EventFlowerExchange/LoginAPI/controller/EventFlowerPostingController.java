package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.PostingCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.EventFlowerPostingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventFlowerPostingController {

    EventFlowerPostingService eventFlowerPostingService;

    // Fetch all posts
    @GetMapping("/")
    public ResponseEntity<List<EventFlowerPosting>> fetchAll(){
        return ResponseEntity.ok(eventFlowerPostingService.getAllEventPostings());
    }

    // Save a new post
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public EventFlowerPosting savePost(@RequestBody EventFlowerPosting postId) {
        return eventFlowerPostingService.insertEventFlowerPosting(postId);
    }

    // Update post by ID
    @PutMapping("/{id}")
    public ResponseEntity<EventFlowerPosting> updatePostId(@PathVariable int id, @RequestBody EventFlowerPosting post) {
        EventFlowerPosting updatedPostId = eventFlowerPostingService.updateEventFlowerPosting(id, post);
        return ResponseEntity.ok(updatedPostId);
    }

    // Delete post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id) {
        eventFlowerPostingService.deleteEventFlowerPosting(id);
        return ResponseEntity.ok("Deleted!");
    }

    // Delete flower batch from post by postID and flowerID
    @DeleteMapping("/{postID}/flowerBatch/{flowerID}")
    public ResponseEntity<String> deleteFlowerBatch(@PathVariable int postID, @PathVariable int flowerID) {
        boolean isDeleted = eventFlowerPostingService.deleteFlowerBatch(postID, flowerID);
        if (isDeleted) {
            return ResponseEntity.ok("Flower batch deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<EventFlowerPosting>> getPostById(@PathVariable int id) {
        Optional<EventFlowerPosting> post = eventFlowerPostingService.getEventFlowerPostingById(id);
        return ResponseEntity.ok(post);
    }

    // Search posts by keyword (title, description, status)
    @GetMapping("/search")
    public ResponseEntity<List<EventFlowerPosting>> searchByKeyword(@RequestParam("q") String keyword) {
        List<EventFlowerPosting> results = eventFlowerPostingService.searchByKeyword(keyword);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    // Search posts by price range
    @GetMapping("/search/price")
    public ResponseEntity<List<EventFlowerPosting>> searchByPriceRange(@RequestParam("minPrice") BigDecimal minPrice,
                                                                       @RequestParam("maxPrice") BigDecimal maxPrice) {
        List<EventFlowerPosting> results = eventFlowerPostingService.searchByPriceRange(minPrice, maxPrice);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    // Create a post by userID
    @PostMapping("/{userID}")
    public ApiResponse<EventFlowerPosting> createPostbyID(@PathVariable int userID, @RequestBody PostingCreationRequest request) {
        EventFlowerPosting createdPost = eventFlowerPostingService.createPostByID(userID, request);

        return ApiResponse.<EventFlowerPosting>builder()
                .result(createdPost)
                .code(1000)
                .message("Post created successfully")
                .build();
    }

}
