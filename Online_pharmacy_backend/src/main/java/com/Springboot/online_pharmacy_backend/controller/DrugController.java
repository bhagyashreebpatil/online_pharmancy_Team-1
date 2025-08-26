package com.Springboot.online_pharmacy_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Springboot.online_pharmacy_backend.dto.DrugDTO;
import com.Springboot.online_pharmacy_backend.service.DrugService;

@RestController
@RequestMapping("/api/drugs")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for your frontend port
public class DrugController {

    @Autowired
    private DrugService drugService;	

    @GetMapping
    public List<DrugDTO> getAllDrugs() {
        return drugService.getAllDrugs();
    }

    @PostMapping
    public DrugDTO addDrug(@RequestBody DrugDTO dto) {
        return drugService.addDrug(dto);
    }

    @PutMapping("/{id}")
    public DrugDTO updateDrug(@PathVariable Long id, @RequestBody DrugDTO dto) {
        return drugService.updateDrug(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteDrug(@PathVariable Long id) {
        drugService.deleteDrug(id);
    }
}
