package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Repository.ResidentRepository;

@Service
public class ResidentServices {
    @Autowired
    ResidentRepository residentRepo;

    // CREATE / INSERT RESIDENT TO THE TABLE
    public ResidentEntity insertResident(ResidentEntity resident) {
        try {
            return residentRepo.save(resident);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Username already exists!");
        }
    }

    // READ / DISPLAY ALL THE RESIDENT OF THE TABLE
    public List<ResidentEntity> getAllResidents() {
        return residentRepo.findAll();
    }

    // DELETE RESIDENT
    public String deleteResident(int id) {
        if (residentRepo.existsById(id)) {
            residentRepo.deleteById(id);
            return "Resident " + id + " has been deleted.";
        } else {
            return "Resident " + id + " does not exist.";
        }
    }

    // UPDATE RESIDENT ISDELETED FLAG
    public String updateResidentIsDeleted(int id) {
        ResidentEntity resident = residentRepo.findById(id).orElse(null);

        if (resident != null) {
            resident.setIsDeleted(true); // Assuming 1 represents deleted.
            residentRepo.save(resident);
            return "Resident " + id + " has been marked as deleted.";
        } else {
            return "Resident " + id + " does not exist.";
        }
    }

    // LOGIN
    public ResidentEntity login(String username, String password) {
        ResidentEntity resident = residentRepo.findByUsernameAndPassword(username, password);

        if (resident != null && resident.isDeleted() == false) {
            // Check if the resident exists and is not deleted
            if (resident.getPassword().equals(password)) {
                return resident;
            }
        }
        return null;
    }

    // LOGOUT
    public String logout(String username) {
        List<ResidentEntity> residents = residentRepo.findByUsername(username);

        if (residents != null && !residents.isEmpty()) {
            return "Logout successfully!";
        } else {
            return "Logout failed! Resident " + username + " does not exist.";
        }
    }

    // FIND USER
    public List<ResidentEntity> findResidents(String username) {
        return residentRepo.findByUsername(username);
    }
}