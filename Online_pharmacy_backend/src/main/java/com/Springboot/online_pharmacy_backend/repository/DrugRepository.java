package com.Springboot.online_pharmacy_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Springboot.online_pharmacy_backend.model.Drug;

public interface DrugRepository extends JpaRepository<Drug, Long> {
}
