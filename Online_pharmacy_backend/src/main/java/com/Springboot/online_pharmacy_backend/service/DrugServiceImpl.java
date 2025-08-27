package com.Springboot.online_pharmacy_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Springboot.online_pharmacy_backend.dto.DrugDTO;
import com.Springboot.online_pharmacy_backend.model.Drug;
import com.Springboot.online_pharmacy_backend.repository.DrugRepository;

@Service
public class DrugServiceImpl implements DrugService {

    @Autowired
    private DrugRepository drugRepository;

    @Override
    public List<DrugDTO> getAllDrugs() {
        List<Drug> drugs = drugRepository.findAll();
        return drugs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    @Override
    public List<DrugDTO> searchByName(String name) {
        // Example:
        List<Drug> drugs = drugRepository.findByNameContainingIgnoreCase(name);
        return drugs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public DrugDTO getDrugById(Long id) {
        Drug drug = drugRepository.findById(id).orElse(null);
        return drug != null ? convertToDTO(drug) : null;
    }

    private DrugDTO convertToDTO(Drug drug) {
        DrugDTO dto = new DrugDTO();
        dto.setId(drug.getId());
        dto.setName(drug.getName());
        dto.setType(drug.getType());
        dto.setPrice(drug.getPrice());
        dto.setQuantity(drug.getQuantity());
        dto.setImageUrl(drug.getImageUrl());
        return dto;
    }
    
    @Override
    public DrugDTO addDrug(DrugDTO dto) {
        Drug drug = new Drug();
        drug.setName(dto.getName());
        drug.setType(dto.getType());
        drug.setPrice(dto.getPrice());
        drug.setQuantity(dto.getQuantity());
        drug.setImageUrl(dto.getImageUrl());
        Drug saved = drugRepository.save(drug);
        return convertToDTO(saved);
    }

    @Override
    public DrugDTO updateDrug(Long id, DrugDTO dto) {
        Drug drug = drugRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Drug not found"));
        drug.setName(dto.getName());
        drug.setType(dto.getType());
        drug.setPrice(dto.getPrice());
        drug.setQuantity(dto.getQuantity());
        drug.setImageUrl(dto.getImageUrl());
        Drug updated = drugRepository.save(drug);
        return convertToDTO(updated);
    }

    @Override
    public void deleteDrug(Long id) {
        drugRepository.deleteById(id);
    }
}