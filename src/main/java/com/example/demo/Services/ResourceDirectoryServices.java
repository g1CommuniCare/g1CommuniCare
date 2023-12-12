package com.example.demo.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.AdminEntity;
import com.example.demo.Entity.ResourceDirectoryEntity;
import com.example.demo.Repository.AdminRepository;
import com.example.demo.Repository.ResourceDirectoryRepository;

@Service
public class ResourceDirectoryServices {

    @Autowired
    private ResourceDirectoryRepository resourceDirectoryRepository;

    @Autowired
    private AdminRepository adminRepository;

    // Create Resource
    public ResourceDirectoryEntity createResource(int adminId, ResourceDirectoryEntity resourceEntity) {
        Optional<AdminEntity> adminOptional = adminRepository.findById(adminId);

        if (adminOptional.isPresent()) {
            AdminEntity admin = adminOptional.get();
            // Set the retrieved admin in the resourceEntity
            resourceEntity.setAdmin(admin);

            // Save the resourceEntity
            return resourceDirectoryRepository.save(resourceEntity);
        } else {
            // Handle the case where the admin with the provided id is not found
            throw new NoSuchElementException("Admin with that id not found.");
        }
    }

    // Read ALL Resources
    public List<ResourceDirectoryEntity> getAllResources() {
        return resourceDirectoryRepository.findAll();
    }

    // Read Resources (isDeleted == false)
    public List<ResourceDirectoryEntity> getAllNonDeletedResources() {
        return resourceDirectoryRepository.findByIsDeletedFalse();
    }

    // Update Resource
    public String updateResource(int resourceId, ResourceDirectoryEntity updatedResource) {
        ResourceDirectoryEntity resource = resourceDirectoryRepository.findById(resourceId).orElse(null);

        if (resource != null) {
            resource.setResourceName(updatedResource.getResourceName());
            resource.setResourceAddress(updatedResource.getResourceAddress());
            resource.setResourceContact(updatedResource.getResourceContact());
            resource.setResourceLatitude(updatedResource.getResourceLatitude());
            resource.setResourceLongitude(updatedResource.getResourceLongitude());
            resource.setDeleted(updatedResource.isDeleted());

            resourceDirectoryRepository.save(resource);

            return "Resource " + resourceId + " has been updated.";
        } else {
            return "Resource " + resourceId + " does not exist.";
        }
    }

    // Soft Delete Resource
    public String updateResourceIsDeleted(int resourceId) {
        ResourceDirectoryEntity resource = resourceDirectoryRepository.findById(resourceId).orElse(null);

        if (resource != null) {
            resource.setDeleted(true);
            resourceDirectoryRepository.save(resource);
            return "Resource " + resourceId + " has been soft deleted.";
        } else {
            return "Resource " + resourceId + " does not exist.";
        }
    }

}
