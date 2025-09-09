package com.Springboot.online_pharmacy_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class ImageStorageService {

    private final String uploadDir = "uploads"; 

    public String save(MultipartFile file) {
        try {
            
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

           
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            
            return "/uploads/" + filename; 
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image", e);
        }
    }
}
