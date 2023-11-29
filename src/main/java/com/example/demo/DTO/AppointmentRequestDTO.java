package com.example.demo.DTO;

import java.time.LocalDateTime;

public class AppointmentRequestDTO {
    private int appreqId;
    private String firstName;
    private String lastName;
    private String middleInitial;
    private String email;
    private String contactNumber;
    private String address;
    private String department;
    private String purpose;
    private String meetingFormat;
    private LocalDateTime meetingDate;
    private String appointmentDetails;
    private String appointmentStatus;
    private String isDeleted;
    private String denialReason;
    private String approvedDetails;
    private LocalDateTime dateRequested;

    public int getAppreqId() {
        return appreqId;
    }

    public void setAppreqId(int appreqId) {
        this.appreqId = appreqId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleInitial() {
        return middleInitial;
    }

    public void setMiddleInitial(String middleInitial) {
        this.middleInitial = middleInitial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getMeetingFormat() {
        return meetingFormat;
    }

    public void setMeetingFormat(String meetingFormat) {
        this.meetingFormat = meetingFormat;
    }

    public LocalDateTime getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDateTime meetingDate) {
        this.meetingDate = meetingDate;
    }

    public String getAppointmentDetails() {
        return appointmentDetails;
    }

    public void setAppointmentDetails(String appointmentDetails) {
        this.appointmentDetails = appointmentDetails;
    }

    public String getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(String appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }

    public String getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(String isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getDenialReason() {
        return denialReason;
    }

    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
    }

    public String getApprovedDetails() {
        return approvedDetails;
    }

    public void setApprovedDetails(String approvedDetails) {
        this.approvedDetails = approvedDetails;
    }

    public LocalDateTime getDateRequested() {
        return dateRequested;
    }

    public void setDateRequested(LocalDateTime dateRequested) {
        this.dateRequested = dateRequested;
    }

    public AppointmentRequestDTO(int appreqId, String firstName, String lastName, String middleInitial, String email,
            String contactNumber, String address, String department, String purpose, String meetingFormat,
            LocalDateTime meetingDate, String appointmentDetails, String appointmentStatus, String isDeleted,
            String denialReason, String approvedDetails, LocalDateTime dateRequested) {
        this.appreqId = appreqId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.department = department;
        this.purpose = purpose;
        this.meetingFormat = meetingFormat;
        this.meetingDate = meetingDate;
        this.appointmentDetails = appointmentDetails;
        this.appointmentStatus = appointmentStatus;
        this.isDeleted = isDeleted;
        this.denialReason = denialReason;
        this.approvedDetails = approvedDetails;
        this.dateRequested = dateRequested;
    }

    public AppointmentRequestDTO() {
    }

}
