package com.example.demo.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tblsettings")
public class SettingsEntity {

    // constructors
    public SettingsEntity() {
    }

    public SettingsEntity(int settingsId, int residentId, int adminId) {
        this.settingsId = settingsId;
        this.residentId = residentId;
        this.adminId = adminId;
    }

    // variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "settings_id")
    private int settingsId;

    // @Column(name = "resident_id")
    private int residentId;

    // @Column(name = "admin_id")
    private int adminId;

    // getters and setters
    public int getSettingsId() {
        return settingsId;
    }

    public int getResidentId() {
        return residentId;
    }

    public void setResidentId(int residentId) {
        this.residentId = residentId;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

}
