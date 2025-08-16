package com.Springboot.online_pharmacy_backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	  boolean existsByEmail(String email);
	}

