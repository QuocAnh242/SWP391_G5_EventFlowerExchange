package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "User") // Explicitly name the table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @Column(nullable = false, length = 255)
    private String username;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    private String address;

    private String phoneNumber;

    private String role = "customer";

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // Default value is current time

}
