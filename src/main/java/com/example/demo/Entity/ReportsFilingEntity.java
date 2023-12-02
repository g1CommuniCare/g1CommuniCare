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

import com.example.demo.DTO.ReportsFilingDTO;

@Entity
@Table(name = "reports_filing")
public class ReportsFilingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int repfilId;

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

    @Column(name = "report_type")
    private String reportType;

    @Column(name = "report_date")
    private LocalDateTime reportDate;

    @Column(name = "date_reported")
    private LocalDateTime dateReported;

    @Column(name = "report_details", length = 1250)
    private String reportDetails;

    @Column(name = "report_status")
    private String reportStatus;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "report_update", length = 1250)
    private String reportUpdate;

    public ReportsFilingEntity() {
        this.reportStatus = "Pending";
        this.isDeleted = false;
    }

    public ReportsFilingEntity(int repfilId, ResidentEntity resident, String firstName, String lastName,
            String middleInitial, String email, String contactNumber, String address, String reportType,
            LocalDateTime reportDate, LocalDateTime dateReported, String reportDetails, 
            boolean isDeleted, String reportUpdate) {
        this.repfilId = repfilId;
        this.resident = resident;
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
        this.isDeleted = isDeleted;
        this.reportUpdate = reportUpdate;
    }

    public ReportsFilingDTO toDTO() {
        ReportsFilingDTO reportsFilingDTO = new ReportsFilingDTO();
        reportsFilingDTO.setRepfilId(this.repfilId);
        reportsFilingDTO.setFirstName(this.firstName);
        reportsFilingDTO.setLastName(this.lastName);
        reportsFilingDTO.setMiddleInitial(this.middleInitial);
        reportsFilingDTO.setEmail(this.email);
        reportsFilingDTO.setContactNumber(this.contactNumber);
        reportsFilingDTO.setAddress(this.address);
        reportsFilingDTO.setReportType(this.reportType);
        reportsFilingDTO.setReportDate(this.reportDate);
        reportsFilingDTO.setDateReported(this.dateReported);
        reportsFilingDTO.setReportDetails(this.reportDetails);
        reportsFilingDTO.setReportStatus(this.reportStatus);
        reportsFilingDTO.setDeleted(this.isDeleted);
        reportsFilingDTO.setReportUpdate(this.reportUpdate);

        return reportsFilingDTO;
    }

    public int getRepfilId() {
        return repfilId;
    }

    public void setRepfilId(int repfilId) {
        this.repfilId = repfilId;
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

}
