package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
@Data
@NoArgsConstructor
public class Feedback {

    @EmbeddedId
    private FeedbackKey id;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("sellerID")
    @JoinColumn(name = "sellerID", nullable = false)
    private User seller;

}
