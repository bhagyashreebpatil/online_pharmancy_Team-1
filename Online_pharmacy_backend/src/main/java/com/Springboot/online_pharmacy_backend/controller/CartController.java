package com.Springboot.online_pharmacy_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Springboot.online_pharmacy_backend.dto.CartDTO;
import com.Springboot.online_pharmacy_backend.dto.DrugOrderRequest;
import com.Springboot.online_pharmacy_backend.model.CartItem;
import com.Springboot.online_pharmacy_backend.repository.CartItemRepository;
import com.Springboot.online_pharmacy_backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private CartItemRepository cartItemRepository;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody DrugOrderRequest request) {
        cartService.addToCart(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getCart(@PathVariable Long userId) {
        CartDTO cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long drugId = payload.get("drugId");

        cartItemRepository.deleteByUserIdAndDrugId(userId, drugId);
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        return ResponseEntity.ok("Item removed");
    }

}
