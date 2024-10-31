package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFeedbackRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final IFeedbackRepository feedbackRepository;
    private final IEventFlowerPostingRepository eventFlowerPostingRepository;
    private final IUserRepository userRepository;

    public Feedback createFeedback(int userID, int postID, String content) {
        User user = userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
        EventFlowerPosting eventFlowerPosting = eventFlowerPostingRepository.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Feedback feedback = Feedback.builder()
                .user(user)
                .eventFlowerPosting(eventFlowerPosting)
                .content(content)
                .build();

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByPostID(int postID) {
        return feedbackRepository.findByEventFlowerPosting_PostID(postID);
    }
}
