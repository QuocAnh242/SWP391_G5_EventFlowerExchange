package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EventFlowerPosting")
public class EventFlowerPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postID;

    private String title; // Corrected typo

    private String description;

    private BigDecimal price;

    private String imageUrl;

    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "eventFlowerPosting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Đánh dấu đây là mối quan hệ cha
    private List<FlowerBatch> flowerBatches = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    public EventFlowerPosting() {
    }

    public EventFlowerPosting(int postID, String title, String description, BigDecimal price, String imageUrl, String status, LocalDateTime createdAt, LocalDateTime updatedAt, List<FlowerBatch> flowerBatches, User user) {
        this.postID = postID;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.flowerBatches = flowerBatches;
        this.user = user;
    }

    // Getters and Setters
    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<FlowerBatch> getFlowerBatches() {
        return flowerBatches;
    }

    public void setFlowerBatches(List<FlowerBatch> flowerBatches) {
        this.flowerBatches = flowerBatches;
    }

}