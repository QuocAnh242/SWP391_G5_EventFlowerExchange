package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;



import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByStatus(String status);
}

