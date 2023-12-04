package com.example.demo.Entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.DTO.NotificationDTO;

@Entity
@Table(name = "table_notification")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    @Column(name = "title")
    private String title;

    @Column(name = "welcome_message")
    private String welcomeMessage;

    @Column(name = "isRead")
    private Boolean isRead;

    @Column(name = "timestamp")
    private LocalDate timestamp;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private AdminEntity senderAdmin;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private ResidentEntity recipientResident;

    @ManyToOne
    @JoinColumn(name = "document_request_id")
    private DocumentRequestEntity relatedDocumentRequest;

    @ManyToOne
    @JoinColumn(name = "appointment_request_id")
    private AppointmentRequestEntity relatedAppointmentRequest;

    @ManyToOne
    @JoinColumn(name = "reports_filing_id")
    private ReportsFilingEntity relatedReportsFiling;

    public NotificationEntity() {
        this.isRead = false;
    }

    public NotificationEntity(AdminEntity senderAdmin, ResidentEntity recipientResident, String title, String welcomeMessage,
            DocumentRequestEntity relatedDocumentRequest, AppointmentRequestEntity relatedAppointmentRequest,
            ReportsFilingEntity relatedReportsFiling) {
        this.senderAdmin = senderAdmin;
        this.recipientResident = recipientResident;
        this.title = title;
        this.welcomeMessage = welcomeMessage;
        this.timestamp = LocalDate.now();
        this.relatedDocumentRequest = relatedDocumentRequest;
        this.relatedAppointmentRequest = relatedAppointmentRequest;
        this.relatedReportsFiling = relatedReportsFiling;
    }

    public NotificationDTO toDTO() {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setNotificationId(this.notificationId);
        notificationDTO.setTitle(this.title);
        notificationDTO.setMessage(this.welcomeMessage);
        notificationDTO.setIsRead(this.isRead);
        notificationDTO.setSenderAdmin(this.senderAdmin);
        notificationDTO.setRecipientResident(this.recipientResident);
        notificationDTO.setRelatedDocumentRequest(this.relatedDocumentRequest);
        notificationDTO.setRelatedAppointmentRequest(this.relatedAppointmentRequest);
        notificationDTO.setRelatedReportsFiling(this.relatedReportsFiling);

        return notificationDTO;
    }

    public int getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(int notificationId) {
        this.notificationId = notificationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return welcomeMessage;
    }

    public void setMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    public AdminEntity getSenderAdmin() {
        return senderAdmin;
    }

    public void setSenderAdmin(AdminEntity senderAdmin) {
        this.senderAdmin = senderAdmin;
    }

    public ResidentEntity getRecipientResident() {
        return recipientResident;
    }

    public void setRecipientResident(ResidentEntity recipientResident) {
        this.recipientResident = recipientResident;
    }

    public DocumentRequestEntity getRelatedDocumentRequest() {
        return relatedDocumentRequest;
    }

    public void setRelatedDocumentRequest(DocumentRequestEntity relatedDocumentRequest) {
        this.relatedDocumentRequest = relatedDocumentRequest;
    }

    public AppointmentRequestEntity getRelatedAppointmentRequest() {
        return relatedAppointmentRequest;
    }

    public void setRelatedAppointmentRequest(AppointmentRequestEntity relatedAppointmentRequest) {
        this.relatedAppointmentRequest = relatedAppointmentRequest;
    }

    public ReportsFilingEntity getRelatedReportsFiling() {
        return relatedReportsFiling;
    }

    public void setRelatedReportsFiling(ReportsFilingEntity relatedReportsFiling) {
        this.relatedReportsFiling = relatedReportsFiling;
    }

}
