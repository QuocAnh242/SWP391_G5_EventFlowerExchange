package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderDetailKey implements Serializable {

    private int orderID;
    private int flowerID;

    // Default constructor
    public OrderDetailKey() {
    }

    // Getters and Setters
    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getFlowerID() {
        return flowerID;
    }

    public void setFlowerID(int flowerID) {
        this.flowerID = flowerID;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderDetailKey)) return false;
        OrderDetailKey that = (OrderDetailKey) o;
        return orderID == that.orderID && flowerID == that.flowerID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderID, flowerID);
    }
}
