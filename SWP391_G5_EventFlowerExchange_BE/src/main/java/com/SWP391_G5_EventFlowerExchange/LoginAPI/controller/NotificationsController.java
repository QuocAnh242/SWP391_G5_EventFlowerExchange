package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Notifications;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/noti")
public class NotificationsController {

    @Autowired
    private NotificationsService notificationsService;

    // Lấy tất cả các Notifications
    @GetMapping("/")
    public ApiResponse<List<Notifications>> fetchAll() {
        List<Notifications> notificationsList = notificationsService.getAllNotifications();
        return new ApiResponse<>(1000, "Notifications retrieved successfully", notificationsList);
    }

    // Cập nhật Notifications theo ID
    @PutMapping("/{id}")
    public ApiResponse<Notifications> updateNotiId(@PathVariable int id, @RequestBody Notifications noti) {
        Notifications updatedNotification = notificationsService.updateNoti(id, noti);
        return new ApiResponse<>(1000, "Notification updated successfully", updatedNotification);
    }

    // Tạo mới Notifications
    @PostMapping("/")
    public ApiResponse<Notifications> saveNoti(@RequestBody Notifications noti) {
        Notifications savedNotification = notificationsService.insertNotifications(noti);
        return new ApiResponse<>(1000, "Notification created successfully", savedNotification);
    }

    // Xóa Notifications theo ID
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteNoti(@PathVariable int id) {
        notificationsService.deleteNotifications(id);
        return new ApiResponse<>(1000, "Notification deleted successfully", "Deleted!");
    }

    // Lấy Notifications theo ID
    @GetMapping("/{id}")
    public ApiResponse<Optional<Notifications>> getNotiById(@PathVariable int id) {
        Optional<Notifications> notification = notificationsService.getNotificationsById(id);
        return new ApiResponse<>(1000, "Notification retrieved successfully", notification);
    }
}
