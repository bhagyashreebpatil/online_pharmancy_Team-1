package com.Springboot.online_pharmacy_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Springboot.online_pharmacy_backend.dto.AdminProfileDTO;
import com.Springboot.online_pharmacy_backend.dto.LoginRequest;
import com.Springboot.online_pharmacy_backend.model.Admin;
import com.Springboot.online_pharmacy_backend.repository.AdminRepository;
import com.Springboot.online_pharmacy_backend.service.AdminService;
import com.Springboot.online_pharmacy_backend.service.ImageStorageService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminService adminService;

    @Autowired
    private ImageStorageService imageStorageService;

    // ✅ Admin Registration
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            Admin savedAdmin = adminService.register(admin);
            return ResponseEntity.ok(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getAdminCount() {
        long count = adminRepository.count(); // or countByStatus("ACTIVE")
        return ResponseEntity.ok(count);
    }

    
    // ✅ Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean isValid = adminService.authenticate(request.getEmail(), request.getPassword());

        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
