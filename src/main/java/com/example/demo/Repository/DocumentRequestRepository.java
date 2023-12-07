package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.DocumentRequestEntity;

public interface DocumentRequestRepository extends JpaRepository<DocumentRequestEntity, Integer> {
    // Custom query method to find by reqId
    // @Query("SELECT dr FROM DocumentRequestEntity dr WHERE dr.reqId = ?1")
    List<DocumentRequestEntity> findBydocreqId(int docreqId);

    List<DocumentRequestEntity> findAllByIsDeletedFalse();

    List<DocumentRequestEntity> findAllByResident_ResidentId(int residentId);

}
