package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserLoginRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    // Create User
    @PostMapping("/create")
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createRequest(request));
        return apiResponse;
    }

    // List Users
    @GetMapping
    List<User> getAllUsers() {
        return userService.getUsers();
    }

    // Find User by Id
    @GetMapping("/{userID}")
    User getUser(@PathVariable("userID") int userID) {
        return userService.getUser(userID);
    }

    // Update Users
    @PutMapping("/{userID}")
    User updateUser(@PathVariable int userID, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userID, request);
    }

    // Delete User
    @DeleteMapping("/{userID}")
    String deleteUser(@PathVariable int userID) {
        userService.deleteUser(userID);
        return "User has been deleted";
    }

    // Login API
    // Adjusted Login API
    @PostMapping("/login")
    public ApiResponse<User> loginUser(@RequestBody @Valid UserLoginRequest request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();

        // Fetch user based on email and password
        User user = userService.getUserByEmailAndPassword(request);

        // Check if user exists (valid login)
        if (user == null) {
            // Set failure response
            apiResponse.setCode(401); // Unauthorized
            apiResponse.setMessage("Invalid email or password. Please try again.");
            apiResponse.setResult(null);
        } else {
            // Set success response
            apiResponse.setCode(200); // OK
            apiResponse.setMessage("Login successful.");
            apiResponse.setResult(user);
        }

        return apiResponse;
    }

}
