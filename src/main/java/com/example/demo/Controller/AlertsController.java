package com.example.demo.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.AlertsEntity;
import com.example.demo.Services.AlertsServices;

@RestController
@RequestMapping("/alerts")
public class AlertsController {
    
    @Autowired
    AlertsServices alertsServices;
    

    // CREATE / INSERT ALERT TO THE TABLE
    @PostMapping("/createAlert")
    public ResponseEntity<AlertsEntity> createAlert(@RequestBody AlertsEntity alert) {
        AlertsEntity createdAlert = alertsServices.insertAlert(alert);
        return new ResponseEntity<>(createdAlert, HttpStatus.CREATED);
    }

    // READ / DISPLAY ALL THE ALERTS OF THE TABLE
    @GetMapping("/getAllAlerts")
    public List<AlertsEntity> getAllAlerts() {
        return alertsServices.getAllAlerts();
    }

    //READ / DISPLAY ALL THE NON DELETE ALERTS OF THE TABLE
    @GetMapping("/getAllNonDeletedAlerts")
    public List<AlertsEntity> getAllNonDeletedAlerts() {
        return alertsServices.getAllNonDeletedAlerts();
    }

    // SOFT DELETE ALERT
    @PutMapping("/deleteAlert/{id}")
    public String deleteAlert(@PathVariable int id) {
        return alertsServices.deleteAlert(id);
    }

    // UPDATE ALERT
    @PutMapping("/updateAlert/{id}")
    public ResponseEntity<AlertsEntity> updateAlert(@PathVariable int id, @RequestBody AlertsEntity alert) {
        AlertsEntity updatedAlert = alertsServices.updateAlert(id, alert);
        return new ResponseEntity<>(updatedAlert, HttpStatus.OK);
    }
    
    // METHOD TO GET THE LATEST ALERT BY DATE
    @GetMapping("/getLatestAlert")
    public AlertsEntity getLatestAlert() {
        return alertsServices.getLatestAlert();
    }
}
