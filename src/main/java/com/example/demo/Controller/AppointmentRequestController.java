package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.AppointmentRequestDTO;
import com.example.demo.Entity.AppointmentRequestEntity;
import com.example.demo.Services.AppointmentRequestServices;

@RestController
@RequestMapping("/appointment-requests")
public class AppointmentRequestController {

    @Autowired
    private AppointmentRequestServices appointmentRequestServices;

    @PostMapping("/add-appointment-request/{residentId}")
    public ResponseEntity<AppointmentRequestDTO> addAppointmentRequest(
            @PathVariable int residentId,
            @RequestBody AppointmentRequestEntity appointmentRequest) {
        AppointmentRequestEntity addedAppointmentRequest = appointmentRequestServices.addAppointmentRequest(residentId,
                appointmentRequest);

        AppointmentRequestDTO addedAppointmentRequestDTO = addedAppointmentRequest.toDTO();
        return new ResponseEntity<>(addedAppointmentRequestDTO, HttpStatus.CREATED);
    }

    @PutMapping("/soft-delete/{appreqId}")
    public ResponseEntity<String> softDeleteAppointmentRequest(@PathVariable int appreqId) {
        String resultMessage = appointmentRequestServices.softDeleteAppointmentRequest(appreqId);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    @GetMapping("/appointment-requests-per-resident/{residentId}")
    public ResponseEntity<List<AppointmentRequestEntity>> getAllAppointmentRequestsByResidentId(
            @PathVariable int residentId) {
        List<AppointmentRequestEntity> appointmentRequests = appointmentRequestServices
                .getAllAppointmentRequestsByResidentId(residentId);
        return new ResponseEntity<>(appointmentRequests, HttpStatus.OK);
    }

    @GetMapping("/get-all-appointment-requests")
    public ResponseEntity<List<AppointmentRequestEntity>> getAllAppointmentRequests() {
        List<AppointmentRequestEntity> appointmentRequests = appointmentRequestServices.getAllAppointmentRequests();
        return new ResponseEntity<>(appointmentRequests, HttpStatus.OK);
    }

    @GetMapping("/non-deleted")
    public ResponseEntity<List<AppointmentRequestEntity>> getAllNonDeletedAppointmentRequests() {
        List<AppointmentRequestEntity> appointmentRequests = appointmentRequestServices
                .getAllNonDeletedAppointmentRequests();
        return new ResponseEntity<>(appointmentRequests, HttpStatus.OK);
    }

    @PutMapping("/update-appointment-status/{appreqId}")
    public ResponseEntity<String> updateAppointmentStatus(
            @PathVariable int appreqId,
            @RequestParam String appointmentStatus) {
        String resultMessage = appointmentRequestServices.updateAppointmentStatus(appreqId, appointmentStatus);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    @PutMapping("/update-denial-reason/{appreqId}")
    public ResponseEntity<String> updateDenialReason(
            @PathVariable int appreqId,
            @RequestParam String denialReason) {
        String resultMessage = appointmentRequestServices.updateDenialReason(appreqId, denialReason);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    @PutMapping("/update-approved-details/{appreqId}")
    public ResponseEntity<String> updateApprovedDetails(
            @PathVariable int appreqId,
            @RequestParam String approvedDetails) {
        String resultMessage = appointmentRequestServices.updateApprovedDetails(appreqId, approvedDetails);
        return new ResponseEntity<>(resultMessage, HttpStatus.OK);
    }

    // Get appointment request by id
    @GetMapping("/get-appointment-request/{appreqId}")
    public ResponseEntity<AppointmentRequestEntity> getAppointmentRequestById(@PathVariable int appreqId) {
        AppointmentRequestEntity appointmentRequest = appointmentRequestServices.getAppointmentRequestById(appreqId);
        return new ResponseEntity<>(appointmentRequest, HttpStatus.OK);
    }

    // Get value of total approved appointments
    @GetMapping("/total-approved")
    public ResponseEntity<Integer> getTotalApprovedAppointments() {
        int totalApprovedAppointments = appointmentRequestServices.getTotalApprovedAppointments();
        return new ResponseEntity<>(totalApprovedAppointments, HttpStatus.OK);
    }

    // Get value of total denied appointments
    @GetMapping("/total-denied")
    public ResponseEntity<Integer> getTotalDeniedAppointments() {
        int totalDeniedAppointments = appointmentRequestServices.getTotalDeniedAppointments();
        return new ResponseEntity<>(totalDeniedAppointments, HttpStatus.OK);
    }

    // Get value of total pending appointments
    @GetMapping("/total-pending")
    public ResponseEntity<Integer> getTotalPendingAppointments() {
        int totalPendingAppointments = appointmentRequestServices.getTotalPendingAppointments();
        return new ResponseEntity<>(totalPendingAppointments, HttpStatus.OK);
    }

}
