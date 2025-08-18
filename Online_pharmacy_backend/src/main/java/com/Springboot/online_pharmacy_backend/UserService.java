package com.Springboot.online_pharmacy_backend;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already in use";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
//        user.setRole(com.Springboot.online_pharmacy_backend.Role.USER);

        userRepository.save(user);
        return "User registered successfully";
    }
    
    public boolean authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // ✅ Check password using PasswordEncoder
            if (passwordEncoder.matches(password, user.getPassword())) {
                return true; // Login successful
            } else {
                return false; // Password incorrect
            }
        } else {
            return false; // Email not found
        }

    }
   


  
}