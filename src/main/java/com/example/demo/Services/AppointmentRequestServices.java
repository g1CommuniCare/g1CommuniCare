package com.example.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.AppointmentRequestEntity;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Repository.AppointmentRequestRepository;
import com.example.demo.Repository.ResidentRepository;

@Service
public class AppointmentRequestServices {

    @Autowired
    AppointmentRequestRepository appointmentRequestRepository;

    @Autowired
    ResidentRepository residentRepository;

    public AppointmentRequestEntity addAppointmentRequest(int residentId, AppointmentRequestEntity appointmentRequest) {
        // Retrieve the ResidentEntity from the database using the residentId
        Optional<ResidentEntity> residentOptional = residentRepository.findById(residentId);

        if (residentOptional.isPresent()) {
            ResidentEntity resident = residentOptional.get();
            // Set the retrieved resident in the appointmentRequest entity
            appointmentRequest.setResident(resident);

            // Additional business logic if needed

            // Save the appointmentRequest entity
            return appointmentRequestRepository.save(appointmentRequest);
        } else {
            // Handle the case where the resident with the provided id is not found
            throw new NoSuchElementException("Resident with that id not found.");
        }
    }

    // Method to soft delete an appointment request
    public String softDeleteAppointmentRequest(int appreqId) {
        // Fetch the appointment request by appreqId from the database
        AppointmentRequestEntity appointmentRequest = appointmentRequestRepository.findById(appreqId).orElse(null);

        if (appointmentRequest != null) {
            appointmentRequest.setDeleted(true);
            // Save the updated appointment request to the database
            appointmentRequestRepository.save(appointmentRequest);
            return "Appointment request marked as deleted successfully.";
        } else {
            return "Appointment request with ID " + appreqId + " not found.";
        }
    }

    // Method to retrieve all appointment requests of a specific resident
    public List<AppointmentRequestEntity> getAllAppointmentRequestsByResidentId(int residentId) {
        return appointmentRequestRepository.findAll()
                .stream()
                .filter(appointmentRequest -> appointmentRequest.getResident().getResidentId() == residentId)
                .collect(Collectors.toList());
    }

    // Method to retrieve all appointment requests
    public List<AppointmentRequestEntity> getAllAppointmentRequests() {
        return appointmentRequestRepository.findAll();
    }

    // Method to retrieve all non-deleted appointment requests
    public List<AppointmentRequestEntity> getAllNonDeletedAppointmentRequests() {
        return appointmentRequestRepository.findAll()
                .stream()
                .filter(appointmentRequest -> !Boolean.TRUE.equals(appointmentRequest.isDeleted()))
                .collect(Collectors.toList());
    }

    // Method to update the appointmentStatus of an appointment request
    public String updateAppointmentStatus(int appreqId, String appointmentStatus) {
        // Fetch the appointment request by appreqId from the database
        AppointmentRequestEntity appointmentRequest = appointmentRequestRepository.findById(appreqId).orElse(null);

        if (appointmentRequest != null) {
            appointmentRequest.setAppointmentStatus(appointmentStatus);
            // Save the updated appointment request to the database
            appointmentRequestRepository.save(appointmentRequest);
            return "Appointment request updated successfully.";
        } else {
            return "Appointment request with ID " + appreqId + " not found.";
        }
    }

    // Method to update the denialReason of an appointment request
    public String updateDenialReason(int appreqId, String denialReason) {
        // Fetch the appointment request by appreqId from the database
        AppointmentRequestEntity appointmentRequest = appointmentRequestRepository.findById(appreqId).orElse(null);

        if (appointmentRequest != null) {
            appointmentRequest.setDenialReason(denialReason);
            // Save the updated appointment request to the database
            appointmentRequestRepository.save(appointmentRequest);
            return "Appointment request updated successfully.";
        } else {
            return "Appointment request with ID " + appreqId + " not found.";
        }
    }

    // Method to update the approvedDetails of an appointment request
    public String updateApprovedDetails(int appreqId, String approvedDetails) {
        // Fetch the appointment request by appreqId from the database
        AppointmentRequestEntity appointmentRequest = appointmentRequestRepository.findById(appreqId).orElse(null);

        if (appointmentRequest != null) {
            appointmentRequest.setApprovedDetails(approvedDetails);
            // Save the updated appointment request to the database
            appointmentRequestRepository.save(appointmentRequest);
            return "Appointment request updated successfully.";
        } else {
            return "Appointment request with ID " + appreqId + " not found.";
        }
    }

    // Get appointment request by id
    public AppointmentRequestEntity getAppointmentRequestById(int appreqId) {
        return appointmentRequestRepository.findById(appreqId).orElse(null);
    }

}
