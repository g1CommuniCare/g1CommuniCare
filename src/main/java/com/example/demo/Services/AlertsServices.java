package com.example.demo.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.AlertsEntity;
import com.example.demo.Repository.AlertsRepository;

@Service
public class AlertsServices {
    
    @Autowired
    AlertsRepository alertsRepo;

    // CREATE / INSERT ALERT TO THE TABLE
    public AlertsEntity insertAlert(AlertsEntity alert) {
        alert.setAlertTimestamp(System.currentTimeMillis()); // Set the timestamp
        return alertsRepo.save(alert);
    }

    // READ / DISPLAY ALL THE ALERTS OF THE TABLE
    public List<AlertsEntity> getAllAlerts() {
        return alertsRepo.findAll();
    }

    //READ / DISPLAY ALL THE NON DELETE ALERTS OF THE TABLE
    public List<AlertsEntity> getAllNonDeletedAlerts() {
        return alertsRepo.findByIsDeleted(false);
    }

    // SOFT DELETE ALERT
    public String deleteAlert(int id) {
        if (alertsRepo.existsById(id)) {
            AlertsEntity alert = alertsRepo.findById(id).get();
            alert.setIsDeleted(true);
            alertsRepo.save(alert);
            return "Alert " + id + " has been deleted.";
        } else {
            return "Alert " + id + " does not exist.";
        }
    }
    
    // UPDATE ALERT
    public AlertsEntity updateAlert(int id, AlertsEntity alert) {
        if (alertsRepo.existsById(id)) {
            AlertsEntity existingAlert = alertsRepo.findById(id).get();
            existingAlert.setAlertTitle(alert.getAlertTitle());
            existingAlert.setAlertDescription(alert.getAlertDescription());
            existingAlert.setAlertDate(alert.getAlertDate());
            existingAlert.setIsDeleted(alert.getIsDeleted());
            return alertsRepo.save(existingAlert);
        } else {
            return null;
        }
    }

    // RETRIEVE THE LATEST ALERT BY DATE AND TIME
    public AlertsEntity getLatestAlert() {
        return alertsRepo.findTopByOrderByAlertDateDesc();
    }

    
}
