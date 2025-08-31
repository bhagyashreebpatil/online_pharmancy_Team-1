package com.Springboot.online_pharmacy_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Springboot.online_pharmacy_backend.model.CartItem;

import jakarta.transaction.Transactional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    List<CartItem> findAllByUserIdAndDrugId(Long userId, Long drugId);
    boolean existsByUserIdAndDrugId(Long userId, Long drugId);
    @Transactional
    void deleteByUserIdAndDrugId(Long userId, Long drugId);
}
