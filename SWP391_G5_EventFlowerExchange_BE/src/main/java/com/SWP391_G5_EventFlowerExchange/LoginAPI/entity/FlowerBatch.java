package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "FlowerBatch")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlowerBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flowerID;

    @Column(nullable = false)
    private String flowerName;

    @Column(nullable = false)
    private int quantity = 1;  // Default value for quantity

    private String status = "available";  // Default value for status

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "postID", nullable = false)
    @JsonBackReference
    private EventFlowerPosting eventFlowerPosting;

    @ManyToOne
    @JoinColumn(name = "categoryID", nullable = false)
    private Category category;
}
