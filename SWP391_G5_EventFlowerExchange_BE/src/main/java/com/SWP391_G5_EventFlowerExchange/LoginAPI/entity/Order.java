package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderID;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private double totalPrice;

    @Column(nullable = false, length = 255)
    private String shippingAddress;

    @Column(nullable = false, length = 50) // Limit length for status
    private String status = "pending";

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

//    @ManyToOne
//    @JoinColumn(name = "deliveryID", nullable = true)
//    @JsonBackReference
//    private Delivery delivery; // Relationship with Delivery
    @ManyToOne
    @JoinColumn(name = "paymentID", nullable = true)
    @JsonBackReference
    private Payment payment; // Relationship with Payment

    // Constructor with required fields
    public Order(LocalDateTime orderDate, double totalPrice, String shippingAddress, User user, Delivery delivery) {
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.shippingAddress = shippingAddress;
        this.user = user;
//        this.delivery = delivery;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
