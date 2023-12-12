package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResourceDirectoryDTO;
import com.example.demo.Entity.ResourceDirectoryEntity;
import com.example.demo.Services.ResourceDirectoryServices;

@RestController
@RequestMapping("/resource-directory")
public class ResourceDirectoryController {

    @Autowired
    private ResourceDirectoryServices resourceDirectoryServices;

    // Create Resource
    @PostMapping("/create-resource")
    public ResponseEntity<ResourceDirectoryDTO> createResource(@RequestParam int adminId,
            @RequestBody ResourceDirectoryEntity resourceEntity) {
        // Pass the adminId to your service method
        ResourceDirectoryEntity createdResource = resourceDirectoryServices.createResource(adminId, resourceEntity);

        // Convert the entity to DTO
        ResourceDirectoryDTO createdResourceDTO = createdResource.toDTO();

        return new ResponseEntity<>(createdResourceDTO, HttpStatus.CREATED);
    }

    // Read Resources (isDeleted == true or false)
    @GetMapping("/get-all-resources")
    public ResponseEntity<List<ResourceDirectoryEntity>> getAllResources() {
        List<ResourceDirectoryEntity> resources = resourceDirectoryServices.getAllResources();
        return new ResponseEntity<>(resources, HttpStatus.OK);
    }

    // Read Resources (isDeleted == false)
    @GetMapping("/get-all-non-deleted-resources")
    public ResponseEntity<List<ResourceDirectoryEntity>> getAllNonDeletedResources() {
        List<ResourceDirectoryEntity> resources = resourceDirectoryServices.getAllNonDeletedResources();
        return new ResponseEntity<>(resources, HttpStatus.OK);
    }

    // Update Resource
    @PutMapping("/update-resource/{resourceId}")
    public ResponseEntity<String> updateResource(
            @PathVariable int resourceId,
            @RequestBody ResourceDirectoryEntity resourceEntity) {

        String result = resourceDirectoryServices.updateResource(resourceId, resourceEntity);

        if (result.startsWith("Resource does not exist")) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    // Soft Delete Resource
    @PutMapping("/{resourceId}/delete-resource")
    public ResponseEntity<String> updateResourceIsDeleted(@PathVariable int resourceId) {
        String result = resourceDirectoryServices.updateResourceIsDeleted(resourceId);
        HttpStatus status = result.contains("does not exist") ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return new ResponseEntity<>(result, status);
    }

}
