package com.Springboot.online_pharmacy_backend.service;


import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Springboot.online_pharmacy_backend.model.Admin;
import com.Springboot.online_pharmacy_backend.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ImageStorageService imageStorageService;



    public Admin register(Admin admin) {
        if (repo.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return repo.save(admin);
    }

    public boolean authenticate(String email, String rawPassword) {
        Optional<Admin> adminOpt = repo.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            return passwordEncoder.matches(rawPassword, admin.getPassword());
        }
        return false;
    }
    
    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + email));
    }

    public Admin updateProfileDetails(String email, String phone, String address, String gender, String dob, MultipartFile profileImage) {
        Admin admin = getAdminByEmail(email);

        admin.setPhone(phone);
        admin.setAddress(address);
        admin.setGender(gender);

        try {
            admin.setDob(LocalDate.parse(dob));
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format. Use yyyy-MM-dd");
        }

        if (profileImage != null && !profileImage.isEmpty()) {
            String imageUrl = imageStorageService.save(profileImage);
            admin.setProfileImage(imageUrl);
        }

        return adminRepository.save(admin);
    }




}