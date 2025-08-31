//package com.Springboot.online_pharmacy_backend.controller;
//
//import java.time.LocalDate;
//import java.time.format.DateTimeParseException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.Springboot.online_pharmacy_backend.dto.LoginRequest;
//import com.Springboot.online_pharmacy_backend.model.Admin;
//import com.Springboot.online_pharmacy_backend.repository.AdminRepository;
//import com.Springboot.online_pharmacy_backend.service.AdminService;
//import com.Springboot.online_pharmacy_backend.service.ImageStorageService;
//
//
//	@RestController
//	@RequestMapping("/api/admin")
//	@CrossOrigin(origins = "http://localhost:5173")
//	public class AdminController {
//		
//	  @Autowired
//	  private AdminRepository adminRepo;
//
//	  @Autowired
//	  private AdminService adminService;
//
//	  @Autowired
//	  private AdminRepository adminRepository;
//
//	  @Autowired
//	  private ImageStorageService imageStorageService;
//
//	  @Autowired
//	  private AdminService service;
//	  
//	  @PostMapping("/register")
//	  public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
//	    try {
//	      Admin savedAdmin = service.register(admin);
//	      return ResponseEntity.ok(savedAdmin);
//	    } catch (Exception e) {
//	      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//	    }
//	  }
//	  
//	  @PostMapping("/login")
//	  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//	      boolean isValid = service.authenticate(request.getEmail(), request.getPassword());
//
//	      if (isValid) {
//	          return ResponseEntity.ok("Login successful");
//	      } else {
//	          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//	      }
//	  }
//
//	}
//
//

package com.Springboot.online_pharmacy_backend.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    // ✅ Fetch Admin Name & Email
    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(@AuthenticationPrincipal UserDetails userDetails) {
    	
    	System.out.println("Authenticated user: " + userDetails.getUsername());

        Admin admin = adminService.getAdminByEmail(userDetails.getUsername());

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }

        // Return only name and email
        return ResponseEntity.ok(new AdminProfileResponse(admin.getName(), admin.getEmail()));
    }

    
    // ✅ Save Extra Profile Details
    @PostMapping("/profile/details")
    public ResponseEntity<String> saveProfileDetails(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestParam("phone") String phone,
        @RequestParam("address") String address,
        @RequestParam("gender") String gender,
        @RequestParam("dob") String dob,
        @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

        Admin admin = adminService.getAdminByEmail(userDetails.getUsername());

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }

        admin.setPhone(phone);
        admin.setAddress(address);
        admin.setGender(gender);

        try {
            admin.setDob(LocalDate.parse(dob)); // expects yyyy-MM-dd
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Use yyyy-MM-dd.");
        }

        if (profileImage != null && !profileImage.isEmpty()) {
            String imageUrl = imageStorageService.save(profileImage);
            admin.setProfileImage(imageUrl);
        }

        adminRepository.save(admin);
        return ResponseEntity.ok("Profile updated successfully");
    }

    // ✅ Response DTO for /profile
    public static class AdminProfileResponse {
        private String name;
        private String email;

        public AdminProfileResponse(String name, String email) {
            this.name = name;
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }
    }
}
