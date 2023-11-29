package com.example.demo.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Services.ResidentServices;

@RestController
@RequestMapping("/resident")
@CrossOrigin
public class ResidentController {
    @Autowired
    ResidentServices residentService;

    // CREATE / INSERTING RESIDENT TO THE TABLE
    @PostMapping("/insertResident")
    public ResidentEntity insertResident(@RequestBody ResidentEntity resident) {
        return residentService.insertResident(resident);
    }

    // GET ALL RESIDENT
    @GetMapping("/getAllResident")
    public List<ResidentEntity> getAllResident() {
        return residentService.getAllResidents();
    }

    // DELETE RESIDENT
    @DeleteMapping("/deleteResident")
    public String deleteResident(@RequestBody ResidentEntity resident) {
        return residentService.deleteResident(resident.getResidentId());
    }

    // DELETE RESIDENT (SOFT DELETE)
    @PutMapping("/{id}/delete")
    public ResponseEntity<String> updateResidentIsDeleted(@PathVariable int id) {
        String result = residentService.updateResidentIsDeleted(id);
        HttpStatus status = result.contains("does not exist") ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return new ResponseEntity<>(result, status);
    }

    // LOGIN
    @PostMapping("/login")
    public ResidentEntity login(@RequestBody ResidentEntity resident) {
        return residentService.login(resident.getUsername(), resident.getPassword());
    }

    // SEARCH RESIDENT
    @GetMapping("/username")
    public List<ResidentEntity> findByUsername(@RequestParam String username) {
        return residentService.findResidents(username);
    }

    // UPLOAD RESIDENT PROFILE IMAGE
    @PostMapping("/{username}/uploadImage")
    public ResponseEntity<String> uploadResidentImage(@PathVariable String username,
            @RequestParam("image") MultipartFile file) {
        try {
            String mimeType = file.getContentType();
            String imageFormat = mimeType != null && mimeType.split("/")[1].equalsIgnoreCase("png") ? "png" : "jpeg";

            List<ResidentEntity> residents = residentService.findResidents(username);
            if (residents.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            ResidentEntity resident = residents.get(0); // Assuming the first match is the desired one

            residentService.updateResidentImage(resident, file.getBytes(), imageFormat);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error occurred while uploading the image");
        }
    }

    // GET RESIDENT PROFILE IMAGE
    @GetMapping(value = "/{username}/image")
    public ResponseEntity<byte[]> getResidentImage(@PathVariable String username) {
        List<ResidentEntity> residents = residentService.findResidents(username);
        if (residents.isEmpty() || residents.get(0).getProfileImage() == null) {
            return ResponseEntity.notFound().build();
        }
        ResidentEntity resident = residents.get(0); // Assuming the first match is the desired one

        String imageFormat = resident.getImageFormat();
        MediaType mediaType = MediaType.IMAGE_JPEG; // default to JPEG
        if ("png".equalsIgnoreCase(imageFormat)) {
            mediaType = MediaType.IMAGE_PNG;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(resident.getProfileImage());
    }

    // VERIFY RESIDENT
    @PostMapping("/verify/{id}")
    public ResponseEntity<String> verifyResident(@PathVariable int id) {
        String result = residentService.verifyResident(id);
        HttpStatus status = result.startsWith("Resident") ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(result, status);
    }

}
