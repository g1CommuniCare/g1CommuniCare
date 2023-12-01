package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.Entity.NotificationEntity;
import com.example.demo.Services.NotificationServices;

@Controller
@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    NotificationServices notificationServices;

    @PostMapping("/create-notif")
    public NotificationEntity sendNotification(@RequestBody NotificationEntity notification) {
        return notificationServices.sendNotification(notification);
    }
}
