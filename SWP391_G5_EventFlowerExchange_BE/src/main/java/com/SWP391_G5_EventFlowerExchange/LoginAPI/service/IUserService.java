package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.UserUpdateRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;

import java.util.List;

public interface IUserService {
    public User createRequest(UserCreationRequest request);
    public List<User> getUsers();
    public User getUser(int userID);
    public User updateUser(int userID, UserUpdateRequest request);
    public void deleteUser(int userID);
    public User getUserByEmailAndPassword(String email, String password);
}
