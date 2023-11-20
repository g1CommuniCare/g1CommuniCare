package com.example.demo.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tableResident")
public class ResidentEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int residentId;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name="middleinitial")
    private String middleInitial;

    @Column(name="email")
    private String email;

    @Column(name="contact_num")
    private String contactNumber;

    @Column(name="address")
    private String address;

    @Column(name="date")
    private String date;

    @Column(name="is_verified")
    private Boolean isVerified;

    public ResidentEntity(int residentId, String username, String password, String firstName, String lastName,
            String middleInitial, String email, String contactNumber, String address, String date, Boolean is_verified) {
        this.residentId = residentId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.date = date;
        this.isVerified = is_verified;
    }

    public int getResidentId() {
        return residentId;
    }

    public void setResidentId(int residentId) {
        this.residentId = residentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getfirstName() {
        return firstName;
    }

    public void setfirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getlastName() {
        return lastName;
    }

    public void setlastName(String lastName) {
        this.lastName = lastName;
    }

    public String getmiddleInitial() {
        return middleInitial;
    }

    public void setmiddleInitial(String middleInitial) {
        this.middleInitial = middleInitial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getcontactNumber() {
        return contactNumber;
    }

    public void setcontactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public ResidentEntity(){
        this.isVerified = false;
    }

    public Boolean isVerified() {
        return isVerified;
    }
    
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
}
