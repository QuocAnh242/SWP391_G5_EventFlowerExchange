package com.SWP391_G5_EventFlowerExchange.LoginAPI.exception;

public class AppException extends RuntimeException {
    // extends RuntimeException khi app error
    private ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
