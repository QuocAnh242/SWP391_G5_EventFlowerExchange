package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createRequest(UserCreationRequest request) {
        User user = new User();

        if(userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());
        user.setCreatedAt(request.getCreatedAt());

        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(int userID) {
        return userRepository.findById(userID)
        .orElseThrow(()-> new RuntimeException("User cannot be found"));
    }

    public User updateUser(int userID, UserUpdateRequest request) {
        User user = getUser(userID);

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());

        return userRepository.save(user);
    }

    public void deleteUser(int userID) {
        userRepository.deleteById(userID);
    }
}
