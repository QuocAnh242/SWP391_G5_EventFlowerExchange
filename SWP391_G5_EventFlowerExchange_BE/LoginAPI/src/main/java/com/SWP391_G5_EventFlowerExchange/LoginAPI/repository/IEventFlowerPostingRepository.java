package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.EventFlowerPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEventFlowerPostingRepository extends JpaRepository<EventFlowerPosting, Integer> {
}
