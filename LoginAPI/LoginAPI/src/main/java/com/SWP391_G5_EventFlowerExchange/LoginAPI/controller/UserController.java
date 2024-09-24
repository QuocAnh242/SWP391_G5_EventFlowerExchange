package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    //create User
    @PostMapping("/create")
    User createUser(@RequestBody @Valid UserCreationRequest request) {
        return userService.createRequest(request);
    }
    //list User
    @GetMapping
    List<User> getAllUsers() {
        return userService.getUsers();
    }
    //find User by Id
    @GetMapping("/{userID}")
    User getUser(@PathVariable("userID") int userID) {
        return userService.getUser(userID);
    }

    @PutMapping("/{userID}")
    User updateUser(@PathVariable int userID, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userID, request);
    }
    
    @DeleteMapping("/{userID}")
    String deleteUser(@PathVariable int userID) {
        userService.deleteUser(userID);
        return "User has been deleted";
    }
}
