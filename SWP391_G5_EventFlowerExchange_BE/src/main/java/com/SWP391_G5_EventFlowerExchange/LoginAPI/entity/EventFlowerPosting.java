package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EventFlowerPosting")
@Data
@NoArgsConstructor
public class EventFlowerPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postID;

    private String title;

    private String description;

    private BigDecimal price;

    private String imageUrl;

    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "eventFlowerPosting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<FlowerBatch> flowerBatches = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
