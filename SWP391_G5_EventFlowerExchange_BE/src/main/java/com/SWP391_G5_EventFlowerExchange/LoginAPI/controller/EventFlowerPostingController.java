package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.EventFlowerPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.math.BigDecimal;
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
    @PutMapping("/{postID}")
    public ResponseEntity<EventFlowerPosting> updatePostId(@PathVariable int postID, @RequestBody EventFlowerPosting post) {
        EventFlowerPosting updatedPostId = eventFlowerPostingService.updateEventFlowerPosting(postID, post);
        return ResponseEntity.ok(updatedPostId);
    }
    @DeleteMapping("/{postID}")
    public ResponseEntity<String> deletePost(@PathVariable int postID) {
        eventFlowerPostingService.deleteEventFlowerPosting(postID);
        return ResponseEntity.ok("Deleted!");
    }
    @DeleteMapping("/{postID}/flowerBatch/{flowerID}")
    public ResponseEntity<String> deleteFlowerBatch(
            @PathVariable int postID,
            @PathVariable int flowerID) {
        boolean isDeleted = eventFlowerPostingService.deleteFlowerBatch(postID, flowerID);
        if (isDeleted) {
            return ResponseEntity.ok("Flower batch deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }}
    @GetMapping("/{postID}")
    public ResponseEntity<Optional<EventFlowerPosting>> getPostById(@PathVariable int postID) {
        Optional<EventFlowerPosting> post= eventFlowerPostingService.getEventFlowerPostingById(postID);
        return ResponseEntity.ok(post);
    }
    // API tìm kiếm theo từ khóa (title, description, status)
    @GetMapping("/search")
    public ResponseEntity<List<EventFlowerPosting>> searchByKeyword(@RequestParam("q") String title) {
//        Pageable pageable = (Pageable) PageRequest.of(page, size);
        List<EventFlowerPosting> results = eventFlowerPostingService.searchByKeyword(title);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
    // API tìm kiếm theo khoảng giá
    @GetMapping("/search/price")
    public ResponseEntity<List<EventFlowerPosting>> searchByPriceRange(@RequestParam("minPrice") BigDecimal minPrice,
                                                                       @RequestParam("maxPrice") BigDecimal maxPrice) {
        List<EventFlowerPosting> results = eventFlowerPostingService.searchByPriceRange(minPrice, maxPrice);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
