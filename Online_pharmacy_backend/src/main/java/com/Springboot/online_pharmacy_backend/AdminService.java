package com.Springboot.online_pharmacy_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
  @Autowired
  private AdminRepository repo;

  public Admin register(Admin admin) {
    if (repo.existsByEmail(admin.getEmail())) {
      throw new RuntimeException("Email already registered");
    }
    admin.setPassword(new BCryptPasswordEncoder().encode(admin.getPassword()));
    return repo.save(admin);
  
 }
}
