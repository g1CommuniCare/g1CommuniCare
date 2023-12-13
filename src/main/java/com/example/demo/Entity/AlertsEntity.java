package com.example.demo.Entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "alerts")
public class AlertsEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alertId;

    @Column(name = "alert_title")
    private String alertTitle;

    @Column(name = "alert_description")
    private String alertDescription;

    @Column(name = "alert_date")
    private LocalDateTime alertDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "alert_timestamp")
    private Long alertTimestamp;

    public AlertsEntity() {
        this.isDeleted = false;
    }

    public AlertsEntity(int alertId, String alertTitle, String alertDescription, LocalDateTime alertDate,
            Boolean isDeleted, Long alertTimestamp) {
        this.alertId = alertId;
        this.alertTitle = alertTitle;
        this.alertDescription = alertDescription;
        this.alertDate = alertDate;
        this.isDeleted = isDeleted;
        this.alertTimestamp = alertTimestamp;
    }

    public int getAlertId() {
        return alertId;
    }

    public void setAlertId(int alertId) {
        this.alertId = alertId;
    }

    public String getAlertTitle() {
        return alertTitle;
    }

    public void setAlertTitle(String alertTitle) {
        this.alertTitle = alertTitle;
    }

    public String getAlertDescription() {
        return alertDescription;
    }

    public void setAlertDescription(String alertDescription) {
        this.alertDescription = alertDescription;
    }

    public LocalDateTime getAlertDate() {
        return alertDate;
    }

    public void setAlertDate(LocalDateTime alertDate) {
        this.alertDate = alertDate;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
    
    public Long getAlertTimestamp() {
        return alertTimestamp;
    }

    public void setAlertTimestamp(Long alertTimestamp) {
        this.alertTimestamp = alertTimestamp;
    }
}
