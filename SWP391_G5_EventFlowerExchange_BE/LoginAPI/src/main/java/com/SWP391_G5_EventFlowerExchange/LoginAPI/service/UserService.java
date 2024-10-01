package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.AppException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.ErrorCode;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.INotificationsRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private INotificationsRepository notificationsRepository;
    @Autowired
    private IEventFlowerPostingRepository iEventFlowerPostingRepository;
    // Create User
    public User createRequest(UserCreationRequest request) {
        User user = new User();

        // Advance Exception Handling
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());
        user.setCreatedAt(LocalDateTime.now());

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
    @Transactional
    public void deleteUser(int userID) {
        // Xóa tất cả các thông báo liên quan đến userId trước
        iEventFlowerPostingRepository.deleteByUser_userID(userID);
        notificationsRepository.deleteByUser_userID(userID);
        userRepository.deleteById(userID);
    }

    public User getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }


}
