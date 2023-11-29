package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.DocumentRequestDTO;
import com.example.demo.Entity.DocumentRequestEntity;
import com.example.demo.Services.DocumentRequestServices;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/document-requests")
public class DocumentRequestController {

    @Autowired
    private DocumentRequestServices documentRequestService;

    // Endpoint to add a new Document Request
    @PostMapping("/add-document-request/{residentId}")
    public ResponseEntity<DocumentRequestDTO> addDocumentRequest(
            @PathVariable int residentId,
            @RequestBody DocumentRequestEntity documentRequest) {
        DocumentRequestEntity savedDocumentRequest = documentRequestService.addDocumentRequest(residentId,
                documentRequest);

        DocumentRequestDTO savedDocumentRequestDTO = savedDocumentRequest.toDTO();
        return new ResponseEntity<>(savedDocumentRequestDTO, HttpStatus.CREATED);
    }

    // Endpoint to soft delete a Document Request
    @PutMapping("/{id}/soft-delete")
    public String softDeleteDocumentRequest(@PathVariable int id) {
        return documentRequestService.softDeleteDocumentRequest(id);
    }

    // Endpoint to retrieve all non-deleted Document Requests
    @GetMapping("/non-deleted")
    public ResponseEntity<List<DocumentRequestEntity>> getAllNonDeletedDocumentRequests() {
        List<DocumentRequestEntity> nonDeletedDocumentRequests = documentRequestService
                .getAllNonDeletedDocumentRequests();
        return new ResponseEntity<>(nonDeletedDocumentRequests, HttpStatus.OK);
    }

    // Endpoint to update the documentStatus of a Document Request
    @PutMapping("/{id}/update-status")
    public ResponseEntity<DocumentRequestDTO> updateDocumentStatus(@PathVariable int id,
            @RequestParam String newDocumentStatus) {
        DocumentRequestEntity updatedDocumentRequest = documentRequestService.updateDocumentStatus(id,
                newDocumentStatus);
        DocumentRequestDTO updatedDocumentRequestDTO = updatedDocumentRequest.toDTO();
        return new ResponseEntity<>(updatedDocumentRequestDTO, HttpStatus.OK);
    }

    // Endpoint to set the claimDate of a Document Request
    @PutMapping("/{id}/set-claim-date")
    public ResponseEntity<DocumentRequestDTO> setClaimDate(@PathVariable int id, @RequestParam String newClaimDate) {
        LocalDate claimDate = LocalDate.parse(newClaimDate); // Convert string to LocalDate
        DocumentRequestEntity updatedDocumentRequest = documentRequestService.setClaimDate(id, claimDate);
        DocumentRequestDTO updatedDocumentRequestDTO = updatedDocumentRequest.toDTO();
        return new ResponseEntity<>(updatedDocumentRequestDTO, HttpStatus.OK);
    }

    // Endpoint to set the denial reason of a Document Request
    @PutMapping("/{id}/set-denial-reason")
    public ResponseEntity<DocumentRequestDTO> setDenialReason(@PathVariable int id,
            @RequestParam String newDenialReason) {
        DocumentRequestEntity updatedDocumentRequest = documentRequestService.setDenialReason(id, newDenialReason);
        DocumentRequestDTO updatedDocumentRequestDTO = updatedDocumentRequest.toDTO();
        return new ResponseEntity<>(updatedDocumentRequestDTO, HttpStatus.OK);
    }
}
