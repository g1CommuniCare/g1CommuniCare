package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.NotificationDTO;
import com.example.demo.Entity.NotificationEntity;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Services.DocumentRequestServices;
import com.example.demo.Services.NotificationServices;
import com.example.demo.Services.ResidentServices;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    @Autowired
    NotificationServices notificationServices;

    @Autowired
    private ResidentServices residentServices;

    @Autowired
    public NotificationController(NotificationServices notificationServices) {
        this.notificationServices = notificationServices;
    }

    @PostMapping("/create")
    public NotificationEntity createNotification(@RequestBody NotificationDTO notificationDTO) {
        return notificationServices.createNotification(notificationDTO);
    }

    // A WELCOME MESSAGE FOR THE RESIDENT
    @PostMapping("/{residentId}")
    public ResponseEntity<String> createWelcomeNotification(@PathVariable int residentId) {
        List<ResidentEntity> residents = residentServices.findResidentsById(residentId);

        if (residents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found");
        }

        for (ResidentEntity resident : residents) {
            notificationServices.createWelcomeNotification(resident);
        }

        return ResponseEntity.ok("Notification was sent to the Resident(backend)");
    }

    // Endpoint to mark a notification as read
    @PostMapping("/mark-as-read/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable int notificationId) {
        notificationServices.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read successfully");
    }

    // Endpoint to get notifications for a specific resident
    @GetMapping("/resident/{residentId}")
    public List<NotificationEntity> getNotificationsForResident(@PathVariable int residentId) {
        return notificationServices.getNotificationsForResident(residentId);
    }

    // GET ALL NOTIFICATIONS
    @GetMapping("/getAllNotifications")
    public List<NotificationEntity> getAllNotifications() {
        return notificationServices.getAllNotifications();
    }

    // Retrieve notifications for a specific resident with their document request
    @GetMapping("/resident/document-request/{residentId}")
    public List<NotificationEntity> getNotificationsForResidentWithDocumentRequest(@PathVariable int residentId,
            DocumentRequestServices documentRequestServices) {
        return notificationServices.getNotificationsForResidentWithDocumentRequest(residentId, documentRequestServices);
    }

    // You can add more endpoints as needed for your specific use case
}
