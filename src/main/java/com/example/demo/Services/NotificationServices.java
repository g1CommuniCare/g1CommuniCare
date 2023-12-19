package com.example.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.NotificationDTO;
import com.example.demo.Entity.DocumentRequestEntity;
import com.example.demo.Entity.NotificationEntity;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Repository.NotificationRepository;

@Service
public class NotificationServices {

    @Autowired
    NotificationRepository notificationRepository;

    public NotificationServices(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // WELCOME MESSAGE FOR THE RESIDENT
    public void createWelcomeNotification(ResidentEntity resident) {
        if (resident.getIsVerified() == true) {
            NotificationEntity notification = new NotificationEntity();
            notification.setMessage("Welcome to CommuniCare");
            notification.setRecipientResident(resident);
            notificationRepository.save(notification);
        }
    }

    public NotificationEntity createNotification(NotificationDTO notificationDTO) {
        // Extract data from DTO and create NotificationEntity
        // For example:
        NotificationEntity notification = new NotificationEntity();
        notification.setTitle(notificationDTO.getTitle());
        notification.setMessage(notificationDTO.getMessage());
        notification.setRecipientResident(notificationDTO.getRecipientResident());
        notification.setRelatedDocumentRequest(notificationDTO.getRelatedDocumentRequest());
        notification.setRelatedAppointmentRequest(notificationDTO.getRelatedAppointmentRequest());
        notification.setRelatedReportsFiling(notificationDTO.getRelatedReportsFiling());
        // Set other fields similarly
        // Save the notification entity
        return notificationRepository.save(notification);
    }

    // Mark a notification as read
    public void markNotificationAsRead(int notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NoSuchElementException("Notification not found"));

        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    // Retrieve notifications for a specific resident
    public List<NotificationEntity> getNotificationsForResident(int residentId) {
        return notificationRepository.findByRecipientResidentResidentIdOrderByTimestampDesc(residentId);
    }

    // DISPLAY ALL THE RESIDENT OF THE TABLE
    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }

    // Retrieve notifications for a specific resident with their document request
    public List<NotificationEntity> getNotificationsForResidentWithDocumentRequest(int residentId,
            DocumentRequestServices documentRequestServices) {
        List<NotificationEntity> notifications = notificationRepository.findByRecipientResidentResidentId(residentId);

        // Fetch document requests for each notification
        for (NotificationEntity notification : notifications) {
            List<DocumentRequestEntity> documentRequests = documentRequestServices
                    .getAllDocumentRequestsByResidentId(residentId);
            notification.setRelatedDocumentRequest((DocumentRequestEntity) documentRequests);
        }

        return notifications;
    }
}
