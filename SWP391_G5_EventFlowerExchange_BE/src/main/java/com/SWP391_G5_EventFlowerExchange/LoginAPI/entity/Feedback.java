package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int feedbackID;

    @Column(nullable = false)
    String content;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "postID", nullable = false)
    EventFlowerPosting eventFlowerPosting;

    @Column(nullable = false)
    LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
