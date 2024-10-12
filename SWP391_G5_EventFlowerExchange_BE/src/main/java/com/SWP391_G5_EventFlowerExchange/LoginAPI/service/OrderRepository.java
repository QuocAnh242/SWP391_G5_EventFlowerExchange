package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;



import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Bạn có thể thêm các phương thức tùy chỉnh nếu cần
}

