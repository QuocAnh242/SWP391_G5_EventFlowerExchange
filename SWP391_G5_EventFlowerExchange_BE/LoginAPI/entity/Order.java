package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderID;

    @Column(nullable = false)
    private LocalDateTime orderDate = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private double totalPrice;

    @Column(nullable = false, length = 255)
    private String shippingAddress;

    @Column(nullable = false, length = 50) // Giới hạn chiều dài cho status
    private String status = "pending";

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "deliveryID", nullable = false)
    private Delivery delivery; // Mối quan hệ với Delivery

    // Constructors
    public Order() {
        // Constructor mặc định
    }

    public Order(LocalDateTime orderDate, double totalPrice, String shippingAddress, User user, Delivery delivery) {
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.shippingAddress = shippingAddress;
        this.user = user;
        this.delivery = delivery;
        this.createdAt = LocalDateTime.now(); // Gán createdAt khi khởi tạo
        this.updatedAt = LocalDateTime.now(); // Gán updatedAt khi khởi tạo
    }

    // Getters and Setters
    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
        this.updatedAt = LocalDateTime.now(); // Cập nhật thời gian khi thay đổi
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
        this.updatedAt = LocalDateTime.now(); // Cập nhật thời gian khi thay đổi
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
        this.updatedAt = LocalDateTime.now(); // Cập nhật thời gian khi thay đổi
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now(); // Cập nhật thời gian khi thay đổi
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }
}
