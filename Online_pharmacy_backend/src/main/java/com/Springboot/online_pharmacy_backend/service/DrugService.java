package com.Springboot.online_pharmacy_backend.service;

import java.util.List;

import com.Springboot.online_pharmacy_backend.dto.DrugDTO;

public interface DrugService {
    DrugDTO addDrug(DrugDTO dto);
    DrugDTO updateDrug(Long id, DrugDTO dto);
    void deleteDrug(Long id);
    List<DrugDTO> getAllDrugs();
    List<DrugDTO> searchByName(String name);
    DrugDTO getDrugById(Long id);
}
