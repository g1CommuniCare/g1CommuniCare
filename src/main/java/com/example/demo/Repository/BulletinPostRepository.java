package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.BulletinPostEntity;

public interface BulletinPostRepository extends JpaRepository<BulletinPostEntity, Integer> {
}
