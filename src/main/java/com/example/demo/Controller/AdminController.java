package com.example.demo.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    // DELETE ADMIN (SOFT DELETE)
    @PutMapping("/{id}/delete")
    public ResponseEntity<String> updateAdminIsDeleted(@PathVariable int id) {
        String result = adminService.updateAdminIsDeleted(id);
        HttpStatus status = result.contains("does not exist") ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return new ResponseEntity<>(result, status);
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

    // UPLOAD ADMIN PROFILE IMAGE
    @PostMapping("/{adminId}/uploadImage")
    public ResponseEntity<String> uploadAdminImage(@PathVariable int adminId,
            @RequestParam("image") MultipartFile file) {
        try {
            String mimeType = file.getContentType();
            String imageFormat = mimeType != null && mimeType.split("/")[1].equalsIgnoreCase("png") ? "png" : "jpeg";

            List<AdminEntity> admins = adminService.findByAdminId(adminId);
            if (admins.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            AdminEntity admin = admins.get(0); // Assuming the first match is the desired one

            adminService.updateAdminImage(admin, file.getBytes(), imageFormat);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error occurred while uploading the image");
        }

    }

    // GET RESIDENT PROFILE IMAGE BY ID
    @GetMapping(value = "/{adminId}/image")
    public ResponseEntity<byte[]> getAdminImage(@PathVariable int adminId) {
        List<AdminEntity> admins = adminService.findByAdminId(adminId);
        if (admins.isEmpty() || admins.get(0).getProfileImage() == null) {
            return ResponseEntity.notFound().build();
        }
        AdminEntity admin = admins.get(0); // Assuming the first match is the desired one

        String imageFormat = admin.getImageFormat();
        MediaType mediaType = MediaType.IMAGE_JPEG; // default to JPEG
        if ("png".equalsIgnoreCase(imageFormat)) {
            mediaType = MediaType.IMAGE_PNG;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(admin.getProfileImage());
    }
}
