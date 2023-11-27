package com.example.demo.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.AdminEntity;
import com.example.demo.Repository.AdminRepository;

@Service
public class AdminServices {
    @Autowired
    AdminRepository adminRepo;

    public List<Map<String, Object>> getActiveAdmin() {
        List<AdminEntity> activeAdminList = adminRepo.findByIsActive(true);
        List<Map<String, Object>> activeAdminInfoList = new ArrayList<>();

        if (activeAdminList != null && !activeAdminList.isEmpty()) {
            for (AdminEntity admin : activeAdminList) {
                Map<String, Object> adminInfo = new HashMap<>();
                adminInfo.put("username", admin.getUsername());
                adminInfo.put("isActive", admin.isActive());
                activeAdminInfoList.add(adminInfo);
            }
        }
        return activeAdminInfoList;
    }

    // CREATE / INSERT ADMIN TO THE TABLE
    public AdminEntity insertAdmin(AdminEntity admin) {
        try {
            return adminRepo.save(admin);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Username already exists!");
        }
    }

    // READ / DISPLAY ALL THE ADMIN OF THE TABLE
    public List<AdminEntity> getAllAdmins() {
        return adminRepo.findAll();
    }

    // DELETE ADMIN
    public String deleteAdmin(int id) {
        if (adminRepo.existsById(id)) {
            adminRepo.deleteById(id);
            return "Admin " + id + " has been deleted.";
        } else {
            return "Admin " + id + " does not exist.";
        }
    }

    // UPDATE ADMIN ISDELETED FLAG
    public String updateAdminIsDeleted(int id) {
        AdminEntity admin = adminRepo.findById(id).orElse(null);

        if (admin != null) {
            admin.setIsDeleted(true); // Assuming 1 represents deleted.
            adminRepo.save(admin);
            return "Admin " + id + " has been marked as deleted.";
        } else {
            return "Admin " + id + " does not exist.";
        }
    }

    // LOGIN
    public AdminEntity login(String username, String password) {
        AdminEntity admin = adminRepo.findByUsernameAndPassword(username, password);

        if (admin != null && admin.isDeleted() == false) {
            if (admin.getPassword().equals(password)) {
                admin.setIsActive(true);
                return adminRepo.save(admin);
            }
        }

        return null;
    }

    // LOGOUT?
    public String logout(String username) {
        List<AdminEntity> admins = adminRepo.findByUsername(username);

        if (admins != null && !admins.isEmpty()) {
            for (AdminEntity admin : admins) {
                admin.setIsActive(false);
            }
            adminRepo.saveAll(admins);
            return "Logout successful for Admin username: " + username;
        } else {
            throw new RuntimeException("Admin with username " + username + " not found.");
        }
    }

    // FIND USERNAME
    public List<AdminEntity> findByUsername(String username) {
        return adminRepo.findByUsername(username);
    }

    // UPDATE RESIDENT PROFILE IMAGE
    public void updateAdminImage(AdminEntity admin, byte[] imageBytes, String imageFormat) {
        admin.setProfileImage(imageBytes);
        admin.setImageFormat(imageFormat);
        adminRepo.save(admin);
    }

    // GET RESIDENT PROFILE IMAGE
    public byte[] getAdminImageByUsername(String username) {
        List<AdminEntity> admin = adminRepo.findByUsername(username);
        if (!admin.isEmpty()) {
            return admin.get(0).getProfileImage(); // Assuming the first match is the desired one
        }
        return null;
    }

    // DISPLAY ALL THE ACTIVE ADMINS
    // public List<String> getActiveAdmin() {
    // List<AdminEntity> activeAdminList = adminRepo.findByIsActive(true);
    // List<String> activeAdminUsername = new ArrayList<>();

    // if (activeAdminList != null && !activeAdminList.isEmpty()) {
    // for (AdminEntity admin : activeAdminList) {
    // activeAdminUsername.add(admin.activeAdmin());
    // }
    // }
    // return activeAdminUsername;
    // }

    // PARA NI SA SEARCH ADMIN IF NEEDED
    // public List<AdminEntity> findByAdminByUsername(String username) {
    // return adminRepo.findByUsername(username);
    // }
}
