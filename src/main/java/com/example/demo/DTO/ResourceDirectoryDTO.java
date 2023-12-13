package com.example.demo.DTO;

public class ResourceDirectoryDTO {
    private int resourceId;
    private String resourceName;
    private String resourceAddress;
    private String resourceContact;
    private Double resourceLatitude;
    private Double resourceLongitude;
    private boolean isDeleted;

    public ResourceDirectoryDTO() {
    }

    public ResourceDirectoryDTO(int resourceId, String resourceName, String resourceAddress,
            String resourceContact, Double resourceLatitude, Double resourceLongitude, boolean isDeleted) {
        this.resourceId = resourceId;
        this.resourceName = resourceName;
        this.resourceAddress = resourceAddress;
        this.resourceContact = resourceContact;
        this.resourceLatitude = resourceLatitude;
        this.resourceLongitude = resourceLongitude;
        this.isDeleted = isDeleted;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
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

    public String getResourceContact() {
        return resourceContact;
    }

    public void setResourceContact(String resourceContact) {
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
