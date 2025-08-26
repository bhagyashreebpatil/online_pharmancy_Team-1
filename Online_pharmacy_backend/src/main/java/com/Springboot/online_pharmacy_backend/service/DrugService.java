package com.Springboot.online_pharmacy_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Springboot.online_pharmacy_backend.dto.DrugDTO;
import com.Springboot.online_pharmacy_backend.model.Drug;
import com.Springboot.online_pharmacy_backend.repository.DrugRepository;

@Service
public class DrugService {

    @Autowired
    private DrugRepository drugRepository;

    public List<DrugDTO> getAllDrugs() {
        return drugRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DrugDTO addDrug(DrugDTO dto) {
        Drug drug = toEntity(dto);
        return toDTO(drugRepository.save(drug));
    }

    public DrugDTO updateDrug(Long id, DrugDTO dto) {
        Drug drug = drugRepository.findById(id).orElseThrow(() -> new RuntimeException("Drug not found"));
        drug.setName(dto.getName());
        drug.setType(dto.getType());
        drug.setPrice(dto.getPrice());
        drug.setQuantity(dto.getQuantity());
        drug.setImageUrl(dto.getImageUrl());
        Drug updated = drugRepository.save(drug);
        return toDTO(updated);

    }

    public void deleteDrug(Long id) {
        drugRepository.deleteById(id);
    }

    private DrugDTO toDTO(Drug drug) {
        DrugDTO dto = new DrugDTO();
        dto.setId(drug.getId());
        dto.setName(drug.getName());
        dto.setType(drug.getType());
        dto.setPrice(drug.getPrice());
        dto.setQuantity(drug.getQuantity());
        dto.setImageUrl(drug.getImageUrl());
        return dto;
    }

    private Drug toEntity(DrugDTO dto) {
        Drug drug = new Drug();
        drug.setName(dto.getName());
        drug.setType(dto.getType());
        drug.setPrice(dto.getPrice());
        drug.setQuantity(dto.getQuantity());
        drug.setImageUrl(dto.getImageUrl());
        return drug;
    }
}