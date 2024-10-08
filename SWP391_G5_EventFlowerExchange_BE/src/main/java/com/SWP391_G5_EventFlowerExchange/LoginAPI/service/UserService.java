package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserUpdateRequest;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    IUserRepository userRepository;
    INotificationsRepository notificationsRepository;
    IEventFlowerPostingRepository iEventFlowerPostingRepository;
    PasswordEncoder passwordEncoder;
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
//      user.setRole("buyer");
        user.setCreatedAt(LocalDateTime.now());
        // encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // set role for user is BUYER
        HashSet<String> Roles = new HashSet<>();
        Roles.add(Role.BUYER.name());

        user.setRoles(Roles);
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return userRepository.findAll();
    }

    public User getUser(int userID) {
        return userRepository.findById(userID)
        .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
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


}
