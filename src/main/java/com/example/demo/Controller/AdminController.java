package com.example.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.AdminEntity;
import com.example.demo.Services.AdminServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    AdminServices adminService;

    // CREATE / INSERTING ADMIN TO THE TABLE
    @PostMapping("/insertAdmin")
    public AdminEntity insertAdmin(@RequestBody AdminEntity admin) {
        return adminService.insertAdmin(admin);
    }

    // GET ACTIVE ADMINS
    @GetMapping("/getActiveAdmin")
    public String getActiveAdmins() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, Object>> activeAdminList = adminService.getActiveAdmin();
        return objectMapper.writeValueAsString(activeAdminList);
    }

    // GET ALL ADMINS
    @GetMapping("/getAllAdmins")
    public List<AdminEntity> getallAdmins() {
        return adminService.getAllAdmins();
    }

    // UPDATE ADMIN

    // DELETE ADMIN
    @DeleteMapping("/deleteAdmin/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return adminService.deleteAdmin(id);
    }

    // LOGIN
    @PostMapping("/login")
    public AdminEntity login(@RequestBody AdminEntity admin) {
        return adminService.login(admin.getUsername(), admin.getPassword());
    }

    // SEARCH ADMIN
    @GetMapping("/username")
    public List<AdminEntity> findByUsername(@RequestParam String username) {
        return adminService.findByUsername(username);
    }
}
