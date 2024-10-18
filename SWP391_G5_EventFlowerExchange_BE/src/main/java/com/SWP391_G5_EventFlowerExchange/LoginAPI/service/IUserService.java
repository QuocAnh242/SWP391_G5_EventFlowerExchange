package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.UserResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;

import java.util.List;

public interface IUserService {
    public User createUser(UserCreationRequest request);
    public UserResponse getUser(int userID);
    public User updateUser(int userID, UserUpdateRequest request);
    public List<User> getUsers();
    public void deleteUser(int userID);
}