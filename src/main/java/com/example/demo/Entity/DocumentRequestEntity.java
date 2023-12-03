package com.example.demo.Entity;

import java.time.LocalDate;
import java.util.Base64;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.DTO.DocumentRequestDTO;

@Entity
@Table(name = "document_request")
public class DocumentRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int docreqId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "resident_id", nullable = false)
    private ResidentEntity resident;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "middleinitial")
    private String middleInitial;

    @Column(name = "email")
    private String email;

    @Column(name = "contact_num")
    private String contactNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "document_Status")
    private String documentStatus;

    @Column(name = "request_date")
    private LocalDate requestDate;

    @Column(name = "purpose", length = 1250)
    private String purpose;

    @Lob
    @Column(name = "valid_id", columnDefinition = "LONGBLOB")
    private byte[] validId;

    @Column(name = "image_format")
    private String imageFormat;

    @Column(name = "valid_id_type")
    private String validIdType;

    @Column(name = "to_print")
    private Boolean toPrint;

    @Column(name = "print_copies")
    private int printCopies;

    @Column(name = "reference_number")
    private String referenceNumber;

    @Column(name = "denial_reason", length = 1250)
    private String denialReason;

    @Column(name = "claim_date")
    private LocalDate claimDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    public DocumentRequestEntity(int docreqId, ResidentEntity resident, String firstName, String lastName,
            String middleInitial, String email, String contactNumber, String address, String documentType,
            LocalDate requestDate, String purpose, byte[] validId, String imageFormat, String validIdType,
            Boolean toPrint, int printCopies, String referenceNumber, String denialReason, LocalDate claimDate,
            Boolean isDeleted) {
        this.docreqId = docreqId;
        this.resident = resident;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.documentType = documentType;
        this.requestDate = requestDate;
        this.purpose = purpose;
        this.validId = validId;
        this.imageFormat = imageFormat;
        this.validIdType = validIdType;
        this.toPrint = toPrint;
        this.printCopies = printCopies;
        this.referenceNumber = referenceNumber;
        this.denialReason = denialReason;
        this.claimDate = claimDate;
        this.isDeleted = false;
    }

    public DocumentRequestEntity() {
        this.isDeleted = false;
        this.documentStatus = "Pending";
    }

    public DocumentRequestDTO toDTO() {
        DocumentRequestDTO documentRequestDTO = new DocumentRequestDTO();
        documentRequestDTO.setDocreqId(this.docreqId);
        documentRequestDTO.setFirstName(this.firstName);
        documentRequestDTO.setLastName(this.lastName);
        documentRequestDTO.setMiddleInitial(this.middleInitial);
        documentRequestDTO.setEmail(this.email);
        documentRequestDTO.setContactNumber(this.contactNumber);
        documentRequestDTO.setAddress(this.address);
        documentRequestDTO.setDocumentType(this.documentType);
        documentRequestDTO.setDocumentStatus(this.documentStatus);
        documentRequestDTO.setRequestDate(this.requestDate);
        documentRequestDTO.setPurpose(this.purpose);
        documentRequestDTO.setValidId(this.validId);
        documentRequestDTO.setImageFormat(this.imageFormat);
        documentRequestDTO.setValidIdType(this.validIdType);
        documentRequestDTO.setToPrint(this.toPrint);
        documentRequestDTO.setPrintCopies(this.printCopies);
        documentRequestDTO.setReferenceNumber(this.referenceNumber);
        documentRequestDTO.setDenialReason(this.denialReason);
        documentRequestDTO.setClaimDate(this.claimDate);
        documentRequestDTO.setIsDeleted(this.isDeleted);
        return documentRequestDTO;
    }

    public int getDocreqId() {
        return docreqId;
    }

    public void setDocreqId(int docreqId) {
        this.docreqId = docreqId;
    }

    public ResidentEntity getResident() {
        return resident;
    }

    public void setResident(ResidentEntity resident) {
        this.resident = resident;
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

    public String getValidIdType() {
        return validIdType;
    }

    public void setValidIdType(String validIdType) {
        this.validIdType = validIdType;
    }

    public Boolean getToPrint() {
        return toPrint;
    }

    public void setToPrint(Boolean toPrint) {
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

    // Add a getter for the base64 string
    public String getValidIdBase64() {
        if (validId != null) {
            return Base64.getEncoder().encodeToString(validId);
        } else {
            return null;
        }
    }

}
