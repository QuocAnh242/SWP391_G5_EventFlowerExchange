package com.SWP391_G5_EventFlowerExchange.LoginAPI.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    // Advance Exception Handling Class
    // Define Error here:
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception."),
    INVALID_KEY_EXCEPTION(9999, "Invalid Error Message Key!"),
    EMAIL_EXISTED(1001, "Email is already existed!"),
    USERNAME_INVALID(1002, "User is invalid!"),
    PASSWORD_INVALID(1003, "Password must be at least 5 characters!"),
    USER_NOT_EXISTED(1004, "User is not existed!"),
    UNAUTHENTICATED(1005, "Unauthenticated"),
    DELETE_USER_ERROR(1006, "Cannot delete this user!"),
    USERID_NOT_FOUND(1007, "UserID is not found!");
    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
