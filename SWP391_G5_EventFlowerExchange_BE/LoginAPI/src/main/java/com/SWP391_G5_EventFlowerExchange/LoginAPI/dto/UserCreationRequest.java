package com.SWP391_G5_EventFlowerExchange.LoginAPI.dto;

import jakarta.validation.constraints.Size;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDate;

public class UserCreationRequest {
    @Size(min = 3, max = 20, message = "USERNAME_INVALID")
    private String username;
    private String email;

    @Size(min= 6, message = "PASSWORD_INVALID")
    private String password;
    private String address;
    private String phoneNumber;
    private String role= "customer";
    private LocalDate createdAt;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
