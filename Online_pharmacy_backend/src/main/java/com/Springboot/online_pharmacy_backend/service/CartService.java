package com.Springboot.online_pharmacy_backend.service;

import com.Springboot.online_pharmacy_backend.dto.CartDTO;
import com.Springboot.online_pharmacy_backend.dto.DrugOrderRequest;

public interface CartService {
    void addToCart(DrugOrderRequest request);
    CartDTO getCartByUserId(Long userId);
    void removeFromCart(Long userId, Long drugId);
}

