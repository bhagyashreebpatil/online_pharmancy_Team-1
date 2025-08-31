package com.Springboot.online_pharmacy_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Springboot.online_pharmacy_backend.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	Optional<Admin> findByEmail(String email);
	 boolean existsByEmail(String email);
	 long count(); 
	}
