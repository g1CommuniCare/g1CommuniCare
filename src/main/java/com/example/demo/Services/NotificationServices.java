package com.example.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.NotificationEntity;
import com.example.demo.Repository.NotificationRepository;

@Service
public class NotificationServices {
    @Autowired
    private NotificationRepository notificationRepository;

    public NotificationEntity sendNotification(NotificationEntity notification) {
        return notificationRepository.save(notification);
    }
}
