package com.example.demo.Entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.DTO.ResourceDirectoryDTO;

@Entity
@Table(name = "resource_directory")
public class ResourceDirectoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resourceId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "admin_id", nullable = false)
    private AdminEntity admin;

    @Column(name = "resource_name", length = 1250)
    private String resourceName;

    @Column(name = "resource_address", length = 1250)
    private String resourceAddress;

    @Column(name = "resource_contact", nullable = false)
    private float resourceContact;

    @Column(name = "resource_latitude", columnDefinition = "DOUBLE DEFAULT 0.0")
    private Double resourceLatitude;

    @Column(name = "resource_longitude", columnDefinition = "DOUBLE DEFAULT 0.0")
    private Double resourceLongitude;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;

    public ResourceDirectoryEntity() {
    }

    public ResourceDirectoryEntity(int resourceId, AdminEntity admin, String resourceName, String resourceAddress,
            float resourceContact, Double resourceLatitude, Double resourceLongitude, boolean isDeleted) {
        this.resourceId = resourceId;
        this.admin = admin;
        this.resourceName = resourceName;
        this.resourceAddress = resourceAddress;
        this.resourceContact = resourceContact;
        this.resourceLatitude = resourceLatitude;
        this.resourceLongitude = resourceLongitude;
        this.isDeleted = isDeleted;
    }

    public ResourceDirectoryDTO toDTO() {
        ResourceDirectoryDTO dto = new ResourceDirectoryDTO();
        dto.setResourceId(this.resourceId);
        dto.setResourceName(this.resourceName);
        dto.setResourceAddress(this.resourceAddress);
        dto.setResourceContact(this.resourceContact);
        dto.setResourceLatitude(this.resourceLatitude);
        dto.setResourceLongitude(this.resourceLongitude);
        dto.setDeleted(this.isDeleted);

        return dto;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public AdminEntity getAdmin() {
        return admin;
    }

    public void setAdmin(AdminEntity admin) {
        this.admin = admin;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getResourceAddress() {
        return resourceAddress;
    }

    public void setResourceAddress(String resourceAddress) {
        this.resourceAddress = resourceAddress;
    }

    public float getResourceContact() {
        return resourceContact;
    }

    public void setResourceContact(float resourceContact) {
        this.resourceContact = resourceContact;
    }

    public Double getResourceLatitude() {
        return resourceLatitude;
    }

    public void setResourceLatitude(Double resourceLatitude) {
        this.resourceLatitude = resourceLatitude;
    }

    public Double getResourceLongitude() {
        return resourceLongitude;
    }

    public void setResourceLongitude(Double resourceLongitude) {
        this.resourceLongitude = resourceLongitude;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

}
