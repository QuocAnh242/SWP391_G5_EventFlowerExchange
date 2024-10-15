package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.UserResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    // USER API
    // Create User
    @PostMapping("/create")
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<User>builder()
                .result(userService.createUser(request))
                .code(1000) // Set success code
                .message("User created successfully") // Set success message
                .build();
    }

    // Find User by their ID
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") int userID) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userID))
                .code(1000) // Set success code
                .message("Get user successfully") // Set success message
                .build();
    }

    @PutMapping("/{userID}")
    public ApiResponse<User> updateUser(@PathVariable int userID, @RequestBody UserUpdateRequest request) {
        User userUpdate= userService.updateUser(userID, request);
            return ApiResponse.<User>builder()
                    .result(userUpdate)
                    .code(1000) // Set success code
                    .message("Update user successfully") // Set success message
                    .build();
    }

    // ADMIN METHODS
    // List Users
    @GetMapping
    ApiResponse<List<User>> getAllUsers() {
        return ApiResponse.<List<User>>builder()
                .result(userService.getUsers())
                .code(1000) // Set success code
                .message("Get all users successfully") // Set success message
                .build();
    }

    // Delete User
    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ApiResponse.<String>builder()
                .result("User has been deleted")
                .code(1000) // Set success code
                .build();
    }

}
