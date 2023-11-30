package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.ResidentEntity;

public interface ResidentRepository extends JpaRepository<ResidentEntity, Integer> {
    // LOGIN
    ResidentEntity findByUsernameAndPassword(String username, String password);

    // SEARCH
    List<ResidentEntity> findByUsername(String username);

    List<ResidentEntity> findByResidentId(int residentId);
}
