package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.FeedbackRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IUserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackService {


    FeedbackRepository feedbackRepository;

    IUserRepository userRepository;

    // Create or save new feedback
    public Feedback saveFeedback(int userID, String comment, int rating, boolean anonymous) {
        Optional<User> userOptional = userRepository.findById(userID);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Feedback feedback = Feedback.builder()
                    .user(user)
                    .comment(comment)
                    .rating(rating)
                    .anonymous(anonymous)
                    .build();
            return feedbackRepository.save(feedback);
        }
        throw new RuntimeException("User not found");
    }

    // Retrieve feedback by user ID
    public List<Feedback> getFeedbackByUserID(int userID) {
        return feedbackRepository.findByUser_UserID(userID);
    }

    // Retrieve feedback by feedback ID
    public Optional<Feedback> getFeedbackByID(int feedbackID) {
        return feedbackRepository.findById(feedbackID);
    }

    // Retrieve all feedback
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    // Update feedback by ID
    public Feedback updateFeedback(int feedbackID, String comment, int rating, boolean anonymous) {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedbackID);
        if (optionalFeedback.isPresent()) {
            Feedback feedback = optionalFeedback.get();
            feedback.setComment(comment);
            feedback.setRating(rating);
            feedback.setAnonymous(anonymous);
            return feedbackRepository.save(feedback);
        }
        throw new RuntimeException("Feedback not found");
    }

    // Delete feedback by ID
    public void deleteFeedback(int feedbackID) {
        if (feedbackRepository.existsById(feedbackID)) {
            feedbackRepository.deleteById(feedbackID);
        } else {
            throw new RuntimeException("Feedback not found");
        }
    }
}
