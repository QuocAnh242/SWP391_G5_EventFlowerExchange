package com.SWP391_G5_EventFlowerExchange.LoginAPI.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FeedbackKey implements Serializable {

    private int userID;
    private int sellerID;

    // Default constructor
    public FeedbackKey() {
    }

    public FeedbackKey(int userID, int sellerID) {
        this.userID = userID;
        this.sellerID = sellerID;
    }

    // Getters and Setters
    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getSellerID() {
        return sellerID;
    }

    public void setSellerID(int sellerID) {
        this.sellerID = sellerID;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FeedbackKey)) return false;
        FeedbackKey that = (FeedbackKey) o;
        return userID == that.userID && sellerID == that.sellerID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, sellerID);
    }
}
