package com.SWP391_G5_EventFlowerExchange.LoginAPI.exception;

public enum ErrorCode {
    // Advance Exception Handling Class
    // Define Error here:
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception."),
    INVALID_KEY_EXCEPTION(9999, "Invalid Error Message Key!"),
    EMAIL_EXISTED(1001, "Email is already existed!"),
    USERNAME_INVALID(1002, "User is invalid!"),
    PASSWORD_INVALID(1003, "Password must be at least 10 characters!"),
    ;
    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
