package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AlertsEntity;

public interface AlertsRepository extends JpaRepository<AlertsEntity, Integer> {
    List<AlertsEntity> findByIsDeleted(Boolean isDeleted);
    AlertsEntity findTopByOrderByAlertDateDesc();
}
