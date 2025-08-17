package com.Springboot.online_pharmacy_backend;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	Optional<Admin> findByEmail(String email);
	 boolean existsByEmail(String email);

	}

