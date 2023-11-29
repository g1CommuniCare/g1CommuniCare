package com.example.demo.Entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.DTO.AppointmentRequestDTO;

@Entity
@Table(name = "appointment_request")
public class AppointmentRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appreqId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "resident_id", nullable = false)
    private ResidentEntity resident;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "middleinitial")
    private String middleInitial;

    @Column(name = "email")
    private String email;

    @Column(name = "contact_num")
    private String contactNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "department")
    private String department;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "meeting_format")
    private String meetingFormat;

    @Column(name = "meeting_date")
    private LocalDateTime meetingDate;

    @Column(name = "appointment_details", length = 1250)
    private String appointmentDetails;

    @Column(name = "appointment_status")
    private String appointmentStatus;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "denial_reason", length = 1250)
    private String denialReason;

    @Column(name = "approved_details", length = 1250)
    private String approvedDetails;

    @Column(name = "date_requested")
    private LocalDateTime dateRequested;

    public AppointmentRequestEntity(int appreqId, ResidentEntity resident, String firstName, String lastName,
            String middleInitial, String email, String contactNumber, String address, String department, String purpose,
            String meetingFormat, LocalDateTime meetingDate, String appointmentDetails, String appointmentStatus,
            boolean isDeleted, String denialReason, String approvedDetails, LocalDateTime dateRequested) {
        this.appreqId = appreqId;
        this.resident = resident;
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

    public AppointmentRequestEntity() {
        this.isDeleted = false;
    }

    public AppointmentRequestDTO toDTO() {
        AppointmentRequestDTO appointmentRequestDTO = new AppointmentRequestDTO();
        appointmentRequestDTO.setAppreqId(this.appreqId);
        appointmentRequestDTO.setFirstName(this.firstName);
        appointmentRequestDTO.setLastName(this.lastName);
        appointmentRequestDTO.setMiddleInitial(this.middleInitial);
        appointmentRequestDTO.setEmail(this.email);
        appointmentRequestDTO.setContactNumber(this.contactNumber);
        appointmentRequestDTO.setAddress(this.address);
        appointmentRequestDTO.setDepartment(this.department);
        appointmentRequestDTO.setPurpose(this.purpose);
        appointmentRequestDTO.setMeetingFormat(this.meetingFormat);
        appointmentRequestDTO.setMeetingDate(this.meetingDate);
        appointmentRequestDTO.setAppointmentDetails(this.appointmentDetails);
        appointmentRequestDTO.setAppointmentStatus(this.appointmentStatus);
        appointmentRequestDTO.setIsDeleted(String.valueOf(this.isDeleted));
        appointmentRequestDTO.setDenialReason(this.denialReason);
        appointmentRequestDTO.setApprovedDetails(this.approvedDetails);
        appointmentRequestDTO.setDateRequested(this.dateRequested);
        return appointmentRequestDTO;
    }

    public int getAppreqId() {
        return appreqId;
    }

    public void setAppreqId(int appreqId) {
        this.appreqId = appreqId;
    }

    public ResidentEntity getResident() {
        return resident;
    }

    public void setResident(ResidentEntity resident) {
        this.resident = resident;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
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

}
