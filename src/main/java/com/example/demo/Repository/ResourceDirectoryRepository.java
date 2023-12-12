package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.ResourceDirectoryEntity;

public interface ResourceDirectoryRepository extends JpaRepository<ResourceDirectoryEntity, Integer> {

    List<ResourceDirectoryEntity> findByIsDeletedFalse();

}
