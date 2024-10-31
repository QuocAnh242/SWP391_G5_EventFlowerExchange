package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.ResourceNotFoundException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFeedbackRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private IFeedbackRepository feedbackRepository;

    public Feedback createFeedback(Feedback feedback) {
        validateFeedback(feedback);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbacksByPostId(int postID) {
        return feedbackRepository.findByEventFlowerPosting_PostID(postID);
    }

    public void likeFeedback(int feedbackID) {
        Feedback feedback = feedbackRepository.findById(feedbackID)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));
        feedback.setLikeCount(feedback.getLikeCount() + 1);
        feedbackRepository.save(feedback);
    }

    private void validateFeedback(Feedback feedback) {
        if (feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new ValidationException("Rating must be between 1 and 5");
        }
        if (feedback.getComment() == null || feedback.getComment().trim().isEmpty()) {
            throw new ValidationException("Comment cannot be empty");
        }
    }

    @Transactional
    public Feedback updateFeedback(int feedbackID, Feedback feedbackDetails) {
        Feedback existingFeedback = feedbackRepository.findById(feedbackID)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));

        existingFeedback.setComment(feedbackDetails.getComment());
        existingFeedback.setRating(feedbackDetails.getRating());
        existingFeedback.setAnonymous(feedbackDetails.isAnonymous());

        // Optionally update the response and responseAt if you want
        existingFeedback.setResponse(feedbackDetails.getResponse());
        existingFeedback.setResponseAt(feedbackDetails.getResponseAt());

        return feedbackRepository.save(existingFeedback);
    }

    @Transactional
    public void deleteFeedback(int feedbackID) {
        Feedback feedback = feedbackRepository.findById(feedbackID)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));
        feedbackRepository.delete(feedback);
    }


    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }


}
