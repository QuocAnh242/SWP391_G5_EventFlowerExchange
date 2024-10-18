package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Feedback;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FeedbackKey;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, FeedbackKey> {
    List<Feedback> findBySeller(User seller);
    List<Feedback> findByUser(User user);
}

