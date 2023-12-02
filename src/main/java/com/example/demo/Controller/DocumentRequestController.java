package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.DocumentRequestDTO;
import com.example.demo.Entity.DocumentRequestEntity;
import com.example.demo.Services.DocumentRequestServices;

import java.io.IOException;
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

    // // Endpoint to update the documentStatus of a Document Request
    // @PutMapping("/{id}/update-status")
    // public ResponseEntity<DocumentRequestDTO> updateDocumentStatus(@PathVariable
    // int id,
    // @RequestParam String newDocumentStatus) {
    // DocumentRequestEntity updatedDocumentRequest =
    // documentRequestService.updateDocumentStatus(id,
    // newDocumentStatus);
    // DocumentRequestDTO updatedDocumentRequestDTO =
    // updatedDocumentRequest.toDTO();
    // return new ResponseEntity<>(updatedDocumentRequestDTO, HttpStatus.OK);
    // }

    // Endpoint to update the documentStatus of a Document Request
    @PutMapping("/{id}/update-status")
    public String updateDocumentStatus(@PathVariable int id, @RequestParam String newDocumentStatus) {
        return documentRequestService.updateDocumentStatus(id, newDocumentStatus);
    }

    // Endpoint to set the claimDate of a Document Request
    @PutMapping("/{id}/set-claim-date")
    public String setClaimDate(@PathVariable int id, @RequestParam String newClaimDate) {
        LocalDate claimDate = LocalDate.parse(newClaimDate); // Convert string to LocalDate
        return documentRequestService.setClaimDate(id, claimDate);
    }

    // Endpoint to set the denial reason of a Document Request
    @PutMapping("/{id}/set-denial-reason")
    public String setDenialReason(@PathVariable int id, @RequestParam String newDenialReason) {
        return documentRequestService.updateDenialReason(id, newDenialReason);
    }

    // Endpoint to retrieve all Document Requests per Resident
    @GetMapping("/document-requests-per-resident/{residentId}")
    public ResponseEntity<List<DocumentRequestEntity>> getAllDocumentRequestsByResidentId(
            @PathVariable int residentId) {
        List<DocumentRequestEntity> documentRequestsPerResident = documentRequestService
                .getAllDocumentRequestsByResidentId(residentId);
        return new ResponseEntity<>(documentRequestsPerResident, HttpStatus.OK);
    }

    // Endpoint to retrieve all Document Requests
    @GetMapping("/all-document-requests")
    public ResponseEntity<List<DocumentRequestEntity>> getAllDocumentRequests() {
        List<DocumentRequestEntity> documentRequests = documentRequestService.getAllDocumentRequests();
        return new ResponseEntity<>(documentRequests, HttpStatus.OK);
    }

    // Upload Valid ID Image
    @PostMapping("/{docreqId}/uploadValidId")
    public ResponseEntity<String> uploadValidId(@PathVariable int docreqId, @RequestParam("image") MultipartFile file) {
        try {
            String mimeType = file.getContentType();
            String imageFormat = mimeType != null && mimeType.split("/")[1].equalsIgnoreCase("png") ? "png" : "jpeg";

            List<DocumentRequestEntity> documentRequests = documentRequestService.findByDocreqId(docreqId);
            if (documentRequests.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            DocumentRequestEntity documentRequest = documentRequests.get(0); // Assuming the first match is the desired
                                                                             // one

            documentRequestService.uploadValidIdImage(documentRequest, file.getBytes(), imageFormat);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error occurred while uploading the image");
        }

    }

    // Get Document Request by ID
    @GetMapping("/doc-req/{docreqId}")
    public ResponseEntity<DocumentRequestEntity> getDocumentRequestById(@PathVariable int docreqId) {
        List<DocumentRequestEntity> documentRequests = documentRequestService.findByDocreqId(docreqId);
        if (documentRequests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        DocumentRequestEntity documentRequest = documentRequests.get(0); // Assuming the first match is the desired
                                                                         // one
        return ResponseEntity.ok(documentRequest);
    }

    // Get VAlid ID Image by Document Request ID
    @GetMapping("/{docreqId}/getValidIdImage")
    public ResponseEntity<byte[]> getValidIdImageByDocreqId(@PathVariable int docreqId) {
        List<DocumentRequestEntity> documentRequests = documentRequestService.findByDocreqId(docreqId);

        if (documentRequests.isEmpty() || documentRequests.get(0).getValidId() == null) {
            return ResponseEntity.notFound().build();
        }

        DocumentRequestEntity documentRequest = documentRequests.get(0); // Assuming the first match is the desired
                                                                         // one
        String imageFormat = documentRequest.getImageFormat();
        MediaType mediaType = MediaType.IMAGE_JPEG; // default to JPEG
        if ("png".equalsIgnoreCase(imageFormat)) {
            mediaType = MediaType.IMAGE_PNG;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(documentRequest.getValidId());

    }

}
