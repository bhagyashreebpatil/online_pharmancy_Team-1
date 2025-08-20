package com.Springboot.online_pharmacy_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Springboot.online_pharmacy_backend.model.Admin;
import com.Springboot.online_pharmacy_backend.repository.AdminRepository;
import com.Springboot.online_pharmacy_backend.service.AdminService;
import com.Springboot.online_pharmacy_backend.dto.LoginRequest;

	@RestController
	@RequestMapping("/api/admin")
	@CrossOrigin(origins = "http://localhost:5174")
	public class AdminController {
		
	  @Autowired
	  private AdminRepository adminRepo;

	 

	  @Autowired
	  private AdminService service;
	  
	  @PostMapping("/register")
	  public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
	    try {
	      Admin savedAdmin = service.register(admin);
	      return ResponseEntity.ok(savedAdmin);
	    } catch (Exception e) {
	      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	  }
	  
	  @PostMapping("/login")
	  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
	      boolean isValid = service.authenticate(request.getEmail(), request.getPassword());

	      if (isValid) {
	          return ResponseEntity.ok("Login successful");
	      } else {
	          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	      }
	  }


	}


