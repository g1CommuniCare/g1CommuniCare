package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {

    List<NotificationEntity> findByRecipientResidentResidentIdOrderByTimestampDesc(int recipientResidentId);

    List<NotificationEntity> findByRecipientResidentResidentId(int residentId);

}
