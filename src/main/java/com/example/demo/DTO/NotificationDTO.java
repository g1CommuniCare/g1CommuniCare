package com.example.demo.DTO;

import com.example.demo.Entity.AdminEntity;
import com.example.demo.Entity.AppointmentRequestEntity;
import com.example.demo.Entity.DocumentRequestEntity;
import com.example.demo.Entity.ReportsFilingEntity;
import com.example.demo.Entity.ResidentEntity;

public class NotificationDTO {
    private int notificationId;
    private String title;
    private String message;
    private Boolean isRead;
    private String timestamp;
    private AdminEntity senderAdmin;
    private ResidentEntity recipientResident;
    private DocumentRequestEntity relatedDocumentRequest;
    private AppointmentRequestEntity relatedAppointmentRequest;
    private ReportsFilingEntity relatedReportsFiling;

    public NotificationDTO() {
        this.isRead = false;
    }

    public NotificationDTO(int notificationId, String title, String message, Boolean isRead, String timestamp,
            AdminEntity senderAdmin, ResidentEntity recipientResident, DocumentRequestEntity relatedDocumentRequest,
            AppointmentRequestEntity relatedAppointmentRequest, ReportsFilingEntity relatedReportsFiling) {
        this.notificationId = notificationId;
        this.title = title;
        this.message = message;
        this.isRead = isRead;
        this.timestamp = timestamp;
        this.senderAdmin = senderAdmin;
        this.recipientResident = recipientResident;
        this.relatedDocumentRequest = relatedDocumentRequest;
        this.relatedAppointmentRequest = relatedAppointmentRequest;
        this.relatedReportsFiling = relatedReportsFiling;
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
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
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