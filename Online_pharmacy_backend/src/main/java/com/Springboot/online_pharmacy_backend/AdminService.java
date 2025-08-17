package com.Springboot.online_pharmacy_backend;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


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


}