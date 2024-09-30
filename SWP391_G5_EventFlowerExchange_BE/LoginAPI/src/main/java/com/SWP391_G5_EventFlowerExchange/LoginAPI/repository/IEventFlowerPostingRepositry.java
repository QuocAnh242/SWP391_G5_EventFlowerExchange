package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEventFlowerPostingRepositry extends JpaRepository<EventFlowerPosting, Integer> {
}
