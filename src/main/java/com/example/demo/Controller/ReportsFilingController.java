package com.example.demo.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ReportsFilingDTO;
import com.example.demo.Entity.ReportsFilingEntity;
import com.example.demo.Services.ReportsFilingServices;

@RestController
@RequestMapping("/reports-filing")
public class ReportsFilingController {

    @Autowired
    private ReportsFilingServices reportsFilingServices;

    // Method to soft delete a report
    @PutMapping("/soft-delete/{repFilId}")
    public ResponseEntity<String> softDelete(@PathVariable int repFilId) {
        String resultMessage = reportsFilingServices.softDelete(repFilId);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    // Method to add a report
    @PostMapping("/addReport/{residentId}")
    public ResponseEntity<ReportsFilingDTO> addReport(
            @PathVariable int residentId,
            @RequestBody ReportsFilingEntity reportsFilingEntity) {
        ReportsFilingEntity addedReport = reportsFilingServices.addReport(residentId, reportsFilingEntity);
        ReportsFilingDTO addedReportDTO = addedReport.toDTO();

        return new ResponseEntity<>(addedReportDTO, HttpStatus.CREATED);
    }

    // Method to retrieve all reports
    @GetMapping("/getAllReports")
    public ResponseEntity<List<ReportsFilingEntity>> getAllReports() {
        List<ReportsFilingEntity> reportsFilingEntity = reportsFilingServices.getAllReports();
        return new ResponseEntity<>(reportsFilingEntity, HttpStatus.OK);
    }

    // Method to retrieve all non deleted reports
    @GetMapping("/getAllNonDeletedReports")
    public ResponseEntity<List<ReportsFilingEntity>> getAllNonDeletedReports() {
        List<ReportsFilingEntity> reportsFilingEntity = reportsFilingServices.getAllNonDeletedReports();
        return new ResponseEntity<>(reportsFilingEntity, HttpStatus.OK);
    }

    // Method to retrieve all reports of a specific resident
    @GetMapping("/getAllReportsFilingByResidentId/{residentId}")
    public ResponseEntity<List<ReportsFilingEntity>> getAllReportsFilingByResidentId(@PathVariable int residentId) {
        List<ReportsFilingEntity> reportsFilingEntity = reportsFilingServices
                .getAllReportsFilingByResidentId(residentId);
        return new ResponseEntity<>(reportsFilingEntity, HttpStatus.OK);
    }

    // Method to retrieve a specific report by repFilId
    @GetMapping("/findReportByRepFilId/{repFilId}")
    public ResponseEntity<ReportsFilingEntity> findReportByRepFilId(@PathVariable int repFilId) {
        ReportsFilingEntity reportsFilingEntity = reportsFilingServices.findReportByRepFilId(repFilId);
        return new ResponseEntity<>(reportsFilingEntity, HttpStatus.OK);
    }

    // Method to update a report status
    @PutMapping("/updateReportStatus/{repFilId}")
    public ResponseEntity<String> updateReportStatus(@PathVariable int repFilId, @RequestBody String newStatus) {
        String resultMessage = reportsFilingServices.updateReportStatus(repFilId, newStatus);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    // Method to update a report update
    @PutMapping("/updateReportUpdate/{repFilId}")
    public ResponseEntity<String> updateReportUpdate(@PathVariable int repFilId, @RequestBody String newUpdate) {
        String resultMessage = reportsFilingServices.setReportUpdate(repFilId, newUpdate);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    // Method to get value of total reports
    @GetMapping("/total-reports")
    public ResponseEntity<Integer> getTotalReports() {
        int totalReports = reportsFilingServices.getTotalReports();
        return new ResponseEntity<>(totalReports, HttpStatus.OK);
    }

    // Method to get value of total Resolved reports
    @GetMapping("/total-resolved")
    public ResponseEntity<Integer> getTotalResolvedReports() {
        int totalResolvedReports = reportsFilingServices.getTotalResolvedReports();
        return new ResponseEntity<>(totalResolvedReports, HttpStatus.OK);
    }

    // Method to get value of total Pending reports
    @GetMapping("/total-pending")
    public ResponseEntity<Integer> getTotalPendingReports() {
        int totalPendingReports = reportsFilingServices.getTotalPendingReports();
        return new ResponseEntity<>(totalPendingReports, HttpStatus.OK);
    }
}
