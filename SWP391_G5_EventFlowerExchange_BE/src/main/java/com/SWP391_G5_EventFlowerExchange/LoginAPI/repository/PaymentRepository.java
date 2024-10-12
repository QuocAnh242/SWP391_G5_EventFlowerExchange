package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}

