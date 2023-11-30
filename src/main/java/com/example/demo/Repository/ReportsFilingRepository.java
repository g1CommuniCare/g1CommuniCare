package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.ReportsFilingEntity;

public interface ReportsFilingRepository extends JpaRepository<ReportsFilingEntity, Integer> {

    List<ReportsFilingEntity> findByIsDeletedFalse();
}
