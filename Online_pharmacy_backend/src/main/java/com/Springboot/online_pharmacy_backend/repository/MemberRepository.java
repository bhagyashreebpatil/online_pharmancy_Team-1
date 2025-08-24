package com.Springboot.online_pharmacy_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Springboot.online_pharmacy_backend.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);
	List<Member> findByRole(String role);
	List<Member> findByNameContainingIgnoreCase(String keyword);
	List<Member> findByEmailContainingIgnoreCase(String keyword);


}

