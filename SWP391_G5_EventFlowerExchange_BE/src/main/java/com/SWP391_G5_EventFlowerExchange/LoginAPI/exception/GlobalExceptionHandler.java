package com.SWP391_G5_EventFlowerExchange.LoginAPI.exception;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    // Expception Handling 1
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handleRuntimeException(final RuntimeException e) {
        ApiResponse apiResponse= new ApiResponse();

        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        // Tra ve error qua api
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // Exception Handling 2
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handleAppException(final AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse apiResponse= new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    //Create Users Error when email is existed
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handleValidation(final MethodArgumentNotValidException e) {
        String enumKey= e.getFieldError().getDefaultMessage();
        ErrorCode errorCode= ErrorCode.INVALID_KEY_EXCEPTION;
        try {
            errorCode = ErrorCode.valueOf(enumKey);
        } catch(IllegalArgumentException ex) {

        }
        ApiResponse apiResponse= new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }
}
