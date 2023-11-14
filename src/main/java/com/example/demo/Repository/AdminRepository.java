package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    // LOGIN
    AdminEntity findByUsernameAndPassword(String username, String password);

    // FINDING ALL THE ACTIVE ADMINS
    List<AdminEntity> findByIsActive(Boolean active);

    // PARA NI SA SEARCH ADMIN IF NEEDED
    List<AdminEntity> findByUsername(String username);
}
