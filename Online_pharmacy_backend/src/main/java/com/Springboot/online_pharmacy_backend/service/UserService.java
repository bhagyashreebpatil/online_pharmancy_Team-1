package com.Springboot.online_pharmacy_backend.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Springboot.online_pharmacy_backend.model.Role;
import com.Springboot.online_pharmacy_backend.model.User;
import com.Springboot.online_pharmacy_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already in use";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
//        

        userRepository.save(user);
        return "User registered successfully";
    }
    
    public boolean authenticate(String email, String password) {
    	
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
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