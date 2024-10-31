package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IFeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByEventFlowerPosting_PostID(int postID);
}
