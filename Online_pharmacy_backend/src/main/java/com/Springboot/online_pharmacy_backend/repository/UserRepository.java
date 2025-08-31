package com.Springboot.online_pharmacy_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Springboot.online_pharmacy_backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    long count();
}