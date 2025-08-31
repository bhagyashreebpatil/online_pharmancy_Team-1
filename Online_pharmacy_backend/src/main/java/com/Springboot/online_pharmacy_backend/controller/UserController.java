package com.Springboot.online_pharmacy_backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Springboot.online_pharmacy_backend.dto.LoginRequest;
import com.Springboot.online_pharmacy_backend.model.User;
import com.Springboot.online_pharmacy_backend.repository.UserRepository;
import com.Springboot.online_pharmacy_backend.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
 

//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        String response = userService.registerUser(user);
//        if (response.equals("User registered successfully")) {
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody LoginRequest request) {
        try {
        	
            // Convert LoginRequest to User entity
        	
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            
            String response = userService.registerUser(user);
            user.setEnabled(true);
 
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            System.err.println("Error during user registration: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Registration failed");
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        long count = userRepository.count();
        return ResponseEntity.ok(count);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
//        String email = credentials.get("email");
//        String password = credentials.get("password");
//
//        boolean isAuthenticated = userService.authenticate(email, password);
//
//        if (isAuthenticated) {
//            return ResponseEntity.ok(Map.of(
//                "success", true,
//                "message", "Login successful"
//            ));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
//                "success", false,
//                "message", "Invalid credentials"
//            ));
//        }
//    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        boolean isAuthenticated = userService.authenticate(email, password);

        if (isAuthenticated) {
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                Map<String, Object> userMap = new HashMap<>();
                userMap.put("id", user.getId());
                userMap.put("email", user.getEmail());
                userMap.put("username", user.getUserName());
                userMap.put("role", user.getRole().toString());

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("user", userMap);

                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
            "success", false,
            "message", "Invalid credentials"
        ));
    }
}
