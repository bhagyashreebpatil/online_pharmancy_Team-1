package com.Springboot.online_pharmacy_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Springboot.online_pharmacy_backend.model.Drug;

public interface DrugRepository extends JpaRepository<Drug, Long> {
	 List<Drug> findByNameContainingIgnoreCase(String name);
}
