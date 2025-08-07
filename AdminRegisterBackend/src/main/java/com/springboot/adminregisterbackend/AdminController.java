package com.springboot.adminregisterbackend;

import com.springboot.adminregisterbackend.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

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
}
