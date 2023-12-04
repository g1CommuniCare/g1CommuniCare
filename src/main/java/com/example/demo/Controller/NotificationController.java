package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.NotificationDTO;
import com.example.demo.Entity.NotificationEntity;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Services.NotificationServices;
import com.example.demo.Services.ResidentServices;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    NotificationServices notificationService;
    
    @Autowired
    private ResidentServices residentServices;

    @Autowired
    public NotificationController(NotificationServices notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/create")
    public NotificationEntity createNotification(@RequestBody NotificationDTO notificationDTO) {
        return notificationService.createNotification(notificationDTO);
    }

    @PostMapping("/{residentId}")
    public ResponseEntity<String> createNotification(@PathVariable int residentId) {
        List<ResidentEntity> residents = residentServices.findResidentsById(residentId);

        if (residents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found");
        }

        ResidentEntity resident = residents.get(0);
        notificationService.createWelcomeNotification(resident);

        return ResponseEntity.ok("Notification was sent to the Resident(backend)");
    }

    // @PostMapping("/{residentId}")
    // public ResponseEntity<String> createNotification(@PathVariable int residentId) {
    //     List<ResidentEntity> residents = residentServices.findResidentsById(residentId);

    //     if (residents.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found");
    //     }

    //     ResidentEntity resident = residents.get(0);

    //     // Call the verifyResident method before creating the notification
    //     String verificationResult = residentServices.verifyResident(residentId);

    //     if (verificationResult.startsWith("Resident")) {
    //         // Resident is verified, proceed with notification creation
    //         NotificationEntity notification = new NotificationEntity();
    //         notification.setMessage("An admin has approved you");
    //         notification.setRecipientResident(resident);
    //         // Set other notification properties as needed

    //         notificationService.createNotification(notification);

    //         return ResponseEntity.ok("Notification was sent to the Resident(backend)");
    //     } else {
    //         // Verification failed, return appropriate response
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(verificationResult);
    //     }
    // }

    // Endpoint to mark a notification as read
    @PostMapping("/mark-as-read/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable int notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read successfully");
    }

    // Endpoint to get notifications for a specific resident
    // @GetMapping("/resident/{residentId}")
    // public List<NotificationEntity> getNotificationsForResident(@PathVariable int residentId) {
    //     return notificationService.getNotificationsForResident(residentId);
    // }

    // Endpoint to get notifications for a specific resident
    @GetMapping("/resident/{residentId}")
    public List<NotificationEntity> getNotificationsForResident(@PathVariable int residentId) {
        return notificationService.getNotificationsForResident(residentId);
    }

    // @GetMapping("/{residentId}")
    // public ResponseEntity<String> getNotification(@PathVariable int residentId) {
    //     ResidentServices resident = (ResidentServices) residentServices.findResidentsById(residentId);

    //     if (resident == null) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found");
    //     }

    //     notificationService.createNotification(resident);

    //     return ResponseEntity.ok("Notification created successfully");
    // }
    // You can add more endpoints as needed for your specific use case
}
