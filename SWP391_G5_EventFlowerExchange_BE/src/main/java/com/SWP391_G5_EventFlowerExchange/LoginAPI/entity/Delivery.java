package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Delivery")
@Data
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer  deliveryID;

    @Column(nullable = false)
    private LocalDateTime deliveryDate;

    @Column(nullable = false)
    private int rating = 0;

    @Column(nullable = false, length = 255)
    private String availableStatus = "available";

//    @OneToMany(mappedBy = "delivery", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Order> orders = new ArrayList<>();
//    public void addOrder(Order order) {
////        orders.add(order);
////        order.setDelivery(this); // Thiết lập mối quan hệ hai chiều
//    }
}
