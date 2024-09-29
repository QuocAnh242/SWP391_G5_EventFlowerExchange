package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Notifications;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.INotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationsService implements INotificationsService  {
    @Autowired
    private INotificationsRepository iNotificationsRepository;

    @Override
    public List<Notifications> getAllNotifications() {
        return iNotificationsRepository.findAll();
    }

    @Override
    public Notifications insertNotifications(Notifications notifications) {
        return iNotificationsRepository.save(notifications);
    }

    @Override
    public void deleteNotifications(int notificationID) {
        iNotificationsRepository.deleteById(notificationID);
    }

    @Override
    public Optional<Notifications> getNotificationsById(int notificationID) {
        return iNotificationsRepository.findById(notificationID);
    }
    @Override
    public Notifications updateNoti(int notiId, Notifications notifications) {
        Notifications noti=iNotificationsRepository.getById(notiId);
        if(noti != null){
            noti.setContent(notifications.getContent());
            noti.setNotificationType(notifications.getNotificationType());
            noti.setCreatedAt(notifications.getCreatedAt());
            noti.setUser(notifications.getUser());
        }
        return null;
    }
}
