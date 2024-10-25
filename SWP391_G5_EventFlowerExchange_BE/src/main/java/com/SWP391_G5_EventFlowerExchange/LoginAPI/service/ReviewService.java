package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.ReviewRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Review;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFlowerBatchRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IReviewRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final IReviewRepository reviewRepository;
    private final IUserRepository userRepository;
    private final IFlowerBatchRepository flowerBatchRepository;

    public Review createReview(ReviewRequest reviewRequest) {
        User user = userRepository.findById(reviewRequest.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));
        FlowerBatch flowerBatch = flowerBatchRepository.findById(reviewRequest.getFlowerID())
                .orElseThrow(() -> new RuntimeException("FlowerBatch not found"));

        Review review = new Review();
        review.setUser(user);
        review.setFlowerBatch(flowerBatch);
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByFlowerId(int flowerID) {
        return reviewRepository.findByFlowerBatch_FlowerID(flowerID);
    }
}
