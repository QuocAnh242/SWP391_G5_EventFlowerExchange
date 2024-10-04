package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "order_details")
public class OrderDetail {

    @EmbeddedId
    private OrderDetailKey id;

    @ManyToOne
    @MapsId("orderID")
    @JoinColumn(name = "orderID")
    private Order order;

    @ManyToOne
    @MapsId("flowerID")
    @JoinColumn(name = "flowerID")
    private FlowerBatch flowerBatch;

    private int quantity;
    private double price;

    // Getters and Setters

    public OrderDetailKey getId() {
        return id;
    }

    public void setId(OrderDetailKey id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public FlowerBatch getFlowerBatch() {
        return flowerBatch;
    }

    public void setFlowerBatch(FlowerBatch flowerBatch) {
        this.flowerBatch = flowerBatch;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // ...
}
