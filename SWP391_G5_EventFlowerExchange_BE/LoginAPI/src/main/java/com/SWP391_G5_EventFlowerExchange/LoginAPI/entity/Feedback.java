package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
public class Feedback {

    @EmbeddedId
    private FeedbackKey id;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    private int rating;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @MapsId("sellerID")
    @JoinColumn(name = "sellerID")
    private User seller;

    // Getters and Setters

    public FeedbackKey getId() {
        return id;
    }

    public void setId(FeedbackKey id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }
}
