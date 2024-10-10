package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.UserResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.enums.Role;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.AppException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.ErrorCode;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IEventFlowerPostingRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.INotificationsRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IUserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService implements IUserService {
    IUserRepository userRepository;
    INotificationsRepository notificationsRepository;
    IEventFlowerPostingRepository iEventFlowerPostingRepository;
    PasswordEncoder passwordEncoder;

    // USER METHODS
    @Override
    public User createUser(UserCreationRequest request) {
        User user = new User();

        // Advance Exception Handling For Already Existed Email
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());

        // Encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set role for user is BUYER
        HashSet<String> roles = new HashSet<>();
        roles.add(Role.BUYER.name());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    // Show Profile
    @Override
    @PostAuthorize("returnObject.email == authentication.name")
    public UserResponse getUser(int userID) {
        UserResponse userResponse = new UserResponse();
        // Test Security...
        log.info("In method getUser");

        // Retrieve User entity
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Convert User to UserResponse
        userResponse.setUserID(user.getUserID());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setAddress(user.getAddress());
        userResponse.setPhoneNumber(user.getPhoneNumber());
        HashSet<String> roles = new HashSet<>();
        roles.add(Role.BUYER.name());
        user.setRoles(roles);
        userResponse.setCreatedAt(user.getCreatedAt());

        return userResponse;
    }

    @Override
    @PostAuthorize("returnObject.email == authentication.name")
    public User updateUser(int userID, UserUpdateRequest request) {
        User user = userRepository.findById(userID).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Update user's information
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());

        return userRepository.save(user);
    }

    // ADMIN METHODS
    // Get all users
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return userRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteUser(int userID) {
        try {
            // Delete all notifications and related entities before deleting the user
            iEventFlowerPostingRepository.deleteByUser_userID(userID);
            notificationsRepository.deleteByUser_userID(userID);
            userRepository.deleteById(userID);
        } catch (Exception e) {
            log.error("Error occurred while deleting user with ID {}: {}", userID, e.getMessage());
            throw new AppException(ErrorCode.DELETE_USER_ERROR, e);  // Pass the original exception
        }
    }

}
