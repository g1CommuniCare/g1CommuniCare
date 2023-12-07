package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AppointmentRequestEntity;

public interface AppointmentRequestRepository extends JpaRepository<AppointmentRequestEntity, Integer> {
    List<AppointmentRequestEntity> findAllByResident_ResidentId(int residentId);

    List<AppointmentRequestEntity> findAllByIsDeletedFalse();
}
