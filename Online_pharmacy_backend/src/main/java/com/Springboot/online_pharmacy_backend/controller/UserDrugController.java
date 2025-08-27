package com.Springboot.online_pharmacy_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Springboot.online_pharmacy_backend.dto.DrugDTO;
import com.Springboot.online_pharmacy_backend.service.DrugService;

@RestController
@RequestMapping("/api/user/drugs")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDrugController {

    @Autowired
    private DrugService drugService;

    @GetMapping
    public ResponseEntity<List<DrugDTO>> fetchAllDrugs() {
        return ResponseEntity.ok(drugService.getAllDrugs());
    }

    @GetMapping("/search")
    public ResponseEntity<List<DrugDTO>> searchDrugs(@RequestParam String name) {
        return ResponseEntity.ok(drugService.searchByName(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrugDTO> fetchDrugById(@PathVariable Long id) {
        return ResponseEntity.ok(drugService.getDrugById(id));
    }
}

