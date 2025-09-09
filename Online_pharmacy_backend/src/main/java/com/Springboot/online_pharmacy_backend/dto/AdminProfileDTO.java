package com.Springboot.online_pharmacy_backend.dto;

public class AdminProfileDTO {
    private String name;
    private String email;
    private String phone;
    private String address;
    private String gender;
    private String dob;
    private String profileImage;

    // Constructor
    public AdminProfileDTO() {}

    public AdminProfileDTO(String name, String email, String phone, String address, String gender, String dob, String profileImage) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
        this.dob = dob;
        this.profileImage = profileImage;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getGender() {
        return gender;
    }

    public String getDob() {
        return dob;
    }

    public String getProfileImage() {
        return profileImage;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}