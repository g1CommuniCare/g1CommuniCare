package com.example.demo.Controller;

import java.util.List;

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
}
