package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "FlowerBatch")
public class FlowerBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flowerID;

    @Column(nullable = false)
    private String flowerName;

    @Column(nullable = false)
    private int quantity;

    private String status;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "postID", nullable = false)
    private EventFlowerPosting eventFlowerPosting;

    @ManyToOne
    @JoinColumn(name = "categoryID", nullable = false)
    private Category category;

    // Getters and Setters
    public int getFlowerID() {
        return flowerID;
    }

    public void setFlowerID(int flowerID) {
        this.flowerID = flowerID;
    }

    public String getFlowerName() {
        return flowerName;
    }

    public void setFlowerName(String flowerName) {
        this.flowerName = flowerName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public EventFlowerPosting getEventFlowerPosting() {
        return eventFlowerPosting;
    }

    public void setEventFlowerPosting(EventFlowerPosting eventFlowerPosting) {
        this.eventFlowerPosting = eventFlowerPosting;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
