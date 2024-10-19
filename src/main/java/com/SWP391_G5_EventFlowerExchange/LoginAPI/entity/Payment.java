package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentID;

    @Column(nullable = false, length = 255)
    private String method;

    @Column(nullable = false, length = 255)
    private String status = "pending";

    private LocalDateTime date = LocalDateTime.now();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderID")
    private Order order;

}
