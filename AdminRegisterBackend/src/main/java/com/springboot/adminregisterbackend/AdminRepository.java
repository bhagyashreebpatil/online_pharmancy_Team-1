package com.springboot.adminregisterbackend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	  boolean existsByEmail(String email);
	}
