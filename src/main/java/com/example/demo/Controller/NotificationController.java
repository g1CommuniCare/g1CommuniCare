package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.NotificationDTO;
import com.example.demo.Entity.NotificationEntity;
import com.example.demo.Services.NotificationServices;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    NotificationServices notificationService;

    @Autowired
    public NotificationController(NotificationServices notificationService) {
        this.notificationService = notificationService;
    }

    // // Endpoint to create a notification
    // @PostMapping("/create")
    // public NotificationEntity createNotification(
    // @RequestBody AdminEntity senderAdmin,
    // @RequestBody ResidentEntity recipientResident,
    // @RequestBody String title,
    // @RequestBody String message,
    // @RequestBody DocumentRequestEntity relatedDocumentRequest,
    // @RequestBody AppointmentRequestEntity relatedAppointmentRequest,
    // @RequestBody ReportsFilingEntity relatedReportsFiling) {

    // return notificationService.createNotification(senderAdmin, recipientResident,
    // title, message,
    // relatedDocumentRequest, relatedAppointmentRequest, relatedReportsFiling);
    // }

    @PostMapping("/create")
    public NotificationEntity createNotification(@RequestBody NotificationDTO notificationDTO) {
        return notificationService.createNotification(notificationDTO);
    }

    // Endpoint to mark a notification as read
    @PostMapping("/mark-as-read/{notificationId}")
    public void markNotificationAsRead(@PathVariable int notificationId) {
        notificationService.markNotificationAsRead(notificationId);
    }

    // Endpoint to get notifications for a specific resident
    @GetMapping("/resident/{residentId}")
    public List<NotificationEntity> getNotificationsForResident(@PathVariable int residentId) {
        return notificationService.getNotificationsForResident(residentId);
    }
    // You can add more endpoints as needed for your specific use case
}
