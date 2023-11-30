package com.example.demo.DTO;

import java.time.LocalDateTime;

public class ReportsFilingDTO {
    private int repfilId;
    private String firstName;
    private String lastName;
    private String middleInitial;
    private String email;
    private String contactNumber;
    private String address;
    private String reportType;
    private LocalDateTime reportDate;
    private LocalDateTime dateReported;
    private String reportDetails;
    private String reportStatus;
    private boolean isDeleted;
    private String reportUpdate;

    public int getRepfilId() {
        return repfilId;
    }

    public void setRepfilId(int repfilId) {
        this.repfilId = repfilId;
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

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }

    public LocalDateTime getDateReported() {
        return dateReported;
    }

    public void setDateReported(LocalDateTime dateReported) {
        this.dateReported = dateReported;
    }

    public String getReportDetails() {
        return reportDetails;
    }

    public void setReportDetails(String reportDetails) {
        this.reportDetails = reportDetails;
    }

    public String getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(String reportStatus) {
        this.reportStatus = reportStatus;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getReportUpdate() {
        return reportUpdate;
    }

    public void setReportUpdate(String reportUpdate) {
        this.reportUpdate = reportUpdate;
    }

    public ReportsFilingDTO(int repfilId, String firstName, String lastName, String middleInitial, String email,
            String contactNumber, String address, String reportType, LocalDateTime reportDate,
            LocalDateTime dateReported, String reportDetails, String reportStatus, boolean isDeleted,
            String reportUpdate) {
        this.repfilId = repfilId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.reportType = reportType;
        this.reportDate = reportDate;
        this.dateReported = dateReported;
        this.reportDetails = reportDetails;
        this.reportStatus = reportStatus;
        this.isDeleted = isDeleted;
        this.reportUpdate = reportUpdate;
    }

    public ReportsFilingDTO() {
    }

}
