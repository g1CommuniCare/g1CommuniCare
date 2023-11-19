package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.SettingsEntity;

@Repository
public interface SettingsRepository extends JpaRepository<SettingsEntity, Integer> {

} // end of SettingsRepository interface