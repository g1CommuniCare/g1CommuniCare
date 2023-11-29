package com.example.demo.DTO;

import java.time.LocalDate;

public class DocumentRequestDTO {
    private int docreqId;
    private String firstName;
    private String lastName;
    private String middleInitial;
    private String email;
    private String contactNumber;
    private String address;
    private String documentType;
    private String documentStatus;
    private LocalDate requestDate;
    private String purpose;
    private byte[] validId;
    private String imageFormat;
    private boolean toPrint;
    private int printCopies;
    private String referenceNumber;
    private String denialReason;
    private LocalDate claimDate;
    private Boolean isDeleted;

    public int getDocreqId() {
        return docreqId;
    }

    public void setDocreqId(int docreqId) {
        this.docreqId = docreqId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleInitial() {
        return middleInitial;
    }

    public void setMiddleInitial(String middleInitial) {
        this.middleInitial = middleInitial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentStatus() {
        return documentStatus;
    }

    public void setDocumentStatus(String documentStatus) {
        this.documentStatus = documentStatus;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public byte[] getValidId() {
        return validId;
    }

    public void setValidId(byte[] validId) {
        this.validId = validId;
    }

    public String getImageFormat() {
        return imageFormat;
    }

    public void setImageFormat(String imageFormat) {
        this.imageFormat = imageFormat;
    }

    public boolean isToPrint() {
        return toPrint;
    }

    public void setToPrint(boolean toPrint) {
        this.toPrint = toPrint;
    }

    public int getPrintCopies() {
        return printCopies;
    }

    public void setPrintCopies(int printCopies) {
        this.printCopies = printCopies;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getDenialReason() {
        return denialReason;
    }

    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
    }

    public LocalDate getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(LocalDate claimDate) {
        this.claimDate = claimDate;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public DocumentRequestDTO(int docreqId, String firstName, String lastName, String middleInitial, String email,
            String contactNumber, String address, String documentType, String documentStatus, LocalDate requestDate,
            String purpose, byte[] validId, String imageFormat, boolean toPrint, int printCopies,
            String referenceNumber, String denialReason, LocalDate claimDate, Boolean isDeleted) {
        this.docreqId = docreqId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.documentType = documentType;
        this.documentStatus = documentStatus;
        this.requestDate = requestDate;
        this.purpose = purpose;
        this.validId = validId;
        this.imageFormat = imageFormat;
        this.toPrint = toPrint;
        this.printCopies = printCopies;
        this.referenceNumber = referenceNumber;
        this.denialReason = denialReason;
        this.claimDate = claimDate;
        this.isDeleted = isDeleted;
    }

    public DocumentRequestDTO() {
    }

}
