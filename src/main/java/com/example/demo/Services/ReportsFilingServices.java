package com.example.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.DocumentRequestEntity;
import com.example.demo.Entity.ReportsFilingEntity;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Repository.ReportsFilingRepository;
import com.example.demo.Repository.ResidentRepository;

@Service
public class ReportsFilingServices {

    @Autowired
    private ReportsFilingRepository reportsFilingRepository;

    @Autowired
    private ResidentRepository residentRepository;

    // Method to soft delete a report
    public String softDelete(int repFilId) {
        ReportsFilingEntity report = reportsFilingRepository.findById(repFilId).orElse(null);
        if (report != null) {
            report.setDeleted(true);
            reportsFilingRepository.save(report);
            return "Report marked as deleted successfully.";
        }
        return "Report with ID " + repFilId + " not found.";
    }

    // Method to add a report
    public ReportsFilingEntity addReport(int residentId, ReportsFilingEntity reportsFilingEntity) {
        // Retrieve the ResidentEntity from the database using the residentId
        Optional<ResidentEntity> resident = residentRepository.findById(residentId);

        if (resident.isPresent()) {
            // Set the retrieved resident in the reportsFilingEntity
            reportsFilingEntity.setResident(resident.get());

            // Additional business logic if needed

            // Save the reportsFilingEntity
            return reportsFilingRepository.save(reportsFilingEntity);
        } else {
            // Handle the case where the resident with the provided id is not found
            throw new NoSuchElementException("Resident with that id not found.");
        }

    }

    // Method to retrieve all reports
    public List<ReportsFilingEntity> getAllReports() {
        return reportsFilingRepository.findAll();
    }

    // Method to retrieve all non deleted reports
    public List<ReportsFilingEntity> getAllNonDeletedReports() {
        return reportsFilingRepository.findByIsDeletedFalse();
    }

    // Method to retrieve all reports of a specific resident
    public List<ReportsFilingEntity> getAllReportsFilingByResidentId(int residentId) {
        return reportsFilingRepository.findAllByResident_ResidentId(residentId);
    }

    // DELETEING REPORT FILING REQUESTS
    public void softDeleteAllReportFilingByResidentId(int residentId) {
        List<ReportsFilingEntity> reportFiling = getAllReportsFilingByResidentId(residentId);
        for (ReportsFilingEntity reportFilingRequest : reportFiling) {
            reportFilingRequest.setDeleted(true);
            reportsFilingRepository.save(reportFilingRequest);
        }
    }

    // Method to retrieve a specific report by repFilId
    public ReportsFilingEntity findReportByRepFilId(int repFilId) {
        return reportsFilingRepository.findById(repFilId).orElse(null);
    }

    // Method to update a report status
    public String updateReportStatus(int repFilId, String newStatus) {
        ReportsFilingEntity report = reportsFilingRepository.findById(repFilId).orElse(null);
        if (report != null) {
            report.setReportStatus(newStatus);
            reportsFilingRepository.save(report);
            return "Report Status updated successfully";
        }
        return "Report with ID " + repFilId + " not found.";
    }

    // Method to update a report update
    public String setReportUpdate(int repFilId, String newUpdate) {
        ReportsFilingEntity report = reportsFilingRepository.findById(repFilId).orElse(null);
        if (report != null) {
            report.setReportUpdate(newUpdate);
            reportsFilingRepository.save(report);
            return "Report Update set successfully";
        }
        return "Report with ID " + repFilId + " not found.";
    }

    // Get value of total reports
    public int getTotalReports() {
        return reportsFilingRepository.findAll().size();
    }

    // Get value of total Resolved reports
    public int getTotalResolvedReports() {
        List<ReportsFilingEntity> reports = reportsFilingRepository.findAll();
        int count = 0;
        for (ReportsFilingEntity report : reports) {
            if (report.getReportStatus().contains("Resolved")) {
                count++;
            }
        }
        return count;
    }

    // Get value of total Pending reports
    public int getTotalPendingReports() {
        List<ReportsFilingEntity> reports = reportsFilingRepository.findAll();
        int count = 0;
        for (ReportsFilingEntity report : reports) {
            if (report.getReportStatus().equals("Pending")) {
                count++;
            }
        }
        return count;
    }
}
