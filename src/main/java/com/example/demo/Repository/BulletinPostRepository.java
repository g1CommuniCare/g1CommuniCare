package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.BulletinPostEntity;

public interface BulletinPostRepository extends JpaRepository<BulletinPostEntity, Integer> {

    // Find all posts that are not deleted
    List<BulletinPostEntity> findByIsDeletedFalse();
}
