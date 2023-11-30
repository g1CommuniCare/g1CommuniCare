package com.example.demo.Services;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.DocumentRequestEntity;
import com.example.demo.Entity.ResidentEntity;
import com.example.demo.Repository.DocumentRequestRepository;
import com.example.demo.Repository.ResidentRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class DocumentRequestServices {

    @Autowired
    DocumentRequestRepository documentRequestRepository;

    @Autowired
    ResidentRepository residentRepository;

    // Method to add a new Document Request with a specific Resident ID
    public DocumentRequestEntity addDocumentRequest(int residentId, DocumentRequestEntity documentRequest) {
        // Retrieve the ResidentEntity from the database using the residentId
        Optional<ResidentEntity> residentOptional = residentRepository.findById(residentId);

        if (residentOptional.isPresent()) {
            ResidentEntity resident = residentOptional.get();
            // Set the retrieved resident in the documentRequest entity
            documentRequest.setResident(resident);

            // Additional business logic if needed

            // Save the documentRequest entity
            return documentRequestRepository.save(documentRequest);
        } else {
            // Handle the case where the resident with the provided id is not found
            throw new NoSuchElementException("Resident with that id not found.");
        }
    }

    // Method to retrieve all Document Requests
    public List<DocumentRequestEntity> getAllDocumentRequests() {
        return documentRequestRepository.findAll();
    }

    // Method to soft delete a Document Request
    public String softDeleteDocumentRequest(int id) {
        // Attempt to find the document request by ID
        DocumentRequestEntity documentRequest = documentRequestRepository.findById(id).orElse(null);

        if (documentRequest == null) {
            // Document Request not found
            return "Document Request not found";
        }

        if (documentRequest.getIsDeleted()) {
            // Document Request is already marked as deleted
            return "Document Request is already marked as deleted";
        }

        // Soft delete the Document Request
        documentRequest.setIsDeleted(true);
        documentRequestRepository.save(documentRequest);

        // Success message
        return "Document Request has been successfully marked as deleted";
    }

    // Method to retrieve all non-deleted Document Requests
    public List<DocumentRequestEntity> getAllNonDeletedDocumentRequests() {
        return documentRequestRepository.findAll()
                .stream()
                .filter(documentRequest -> !Boolean.TRUE.equals(documentRequest.getIsDeleted()))
                .collect(Collectors.toList());
    }

    // // Method to update the documentStatus of a Document Request
    // public String updateDocumentStatus(int id, String newDocumentStatus) {
    // DocumentRequestEntity documentRequest =
    // documentRequestRepository.findBydocreqId(id);
    // if (documentRequest != null) {
    // documentRequest.setDocumentStatus(newDocumentStatus);
    // documentRequestRepository.save(documentRequest);
    // return "Document status updated successfully.";
    // } else {
    // return "Document Request not found with id: " + id;
    // }
    // }

    // Method to update the documentStatus of a Document Request
    public String updateDocumentStatus(int id, String newDocumentStatus) {
        List<DocumentRequestEntity> documentRequests = documentRequestRepository.findBydocreqId(id);

        if (!documentRequests.isEmpty()) {
            for (DocumentRequestEntity documentRequest : documentRequests) {
                documentRequest.setDocumentStatus(newDocumentStatus);
                documentRequestRepository.save(documentRequest);
            }
            return "Document status updated successfully for " + documentRequests.size() + " document requests.";
        } else {
            return "Document Requests not found with id: " + id;
        }
    }

    // // Method to set the claimDate of a Document Request
    // public String setClaimDate(int id, LocalDate newClaimDate) {
    // DocumentRequestEntity documentRequest =
    // documentRequestRepository.findBydocreqId(id);
    // if (documentRequest != null) {
    // documentRequest.setClaimDate(newClaimDate);
    // documentRequestRepository.save(documentRequest);
    // return "Claim date updated successfully.";
    // } else {
    // return "Document Request not found with id: " + id;
    // }
    // }

    // Method to set the claimDate of a Document Request
    public String setClaimDate(int id, LocalDate newClaimDate) {
        List<DocumentRequestEntity> documentRequests = documentRequestRepository.findBydocreqId(id);

        if (!documentRequests.isEmpty()) {
            for (DocumentRequestEntity documentRequest : documentRequests) {
                documentRequest.setClaimDate(newClaimDate);
                documentRequestRepository.save(documentRequest);
            }
            return "Claim date updated successfully for " + documentRequests.size() + " document requests.";
        } else {
            return "Document Requests not found with id: " + id;
        }
    }

    // // Method to set the denial reason of a Document Request
    // public String updateDenialReason(int id, String newDenialReason) {
    // DocumentRequestEntity documentRequest =
    // documentRequestRepository.findBydocreqId(id);
    // if (documentRequest != null) {
    // documentRequest.setDenialReason(newDenialReason);
    // documentRequestRepository.save(documentRequest);
    // return "Denial reason updated successfully.";
    // } else {
    // return "Document Request not found with id: " + id;
    // }
    // }

    // Method to set the denial reason of a Document Request
    public String updateDenialReason(int id, String newDenialReason) {
        List<DocumentRequestEntity> documentRequests = documentRequestRepository.findBydocreqId(id);

        if (!documentRequests.isEmpty()) {
            for (DocumentRequestEntity documentRequest : documentRequests) {
                documentRequest.setDenialReason(newDenialReason);
                documentRequestRepository.save(documentRequest);
            }
            return "Denial reason updated successfully for " + documentRequests.size() + " document requests.";
        } else {
            return "Document Requests not found with id: " + id;
        }
    }

    // Method to retrieve all Document Requests of a specific Resident
    public List<DocumentRequestEntity> getAllDocumentRequestsByResidentId(int residentId) {
        return documentRequestRepository.findAll()
                .stream()
                .filter(documentRequest -> documentRequest.getResident().getResidentId() == residentId)
                .collect(Collectors.toList());
    }

    // Upload Valid ID Image
    public void uploadValidIdImage(DocumentRequestEntity documentRequest, byte[] imageBytes, String imageFormat) {
        documentRequest.setValidId(imageBytes);
        documentRequest.setImageFormat(imageFormat);
        documentRequestRepository.save(documentRequest);
    }

    // Find Document Request by ID
    public List<DocumentRequestEntity> findByDocreqId(int docreqId) {
        return documentRequestRepository.findBydocreqId(docreqId);
    }
}
