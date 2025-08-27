package com.Springboot.online_pharmacy_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Springboot.online_pharmacy_backend.dto.CartDTO;
import com.Springboot.online_pharmacy_backend.dto.DrugOrderRequest;
import com.Springboot.online_pharmacy_backend.service.CartService;


@RestController
@RequestMapping("/api/user/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDrugOrderController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> saveDrugOrder(@RequestBody DrugOrderRequest request) {
        cartService.addToCart(request);
        return ResponseEntity.ok("Drug added to cart successfully!");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getUserCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }
    
    @DeleteMapping("/{userId}/{drugId}")
    public ResponseEntity<String> removeDrug(@PathVariable Long userId, @PathVariable Long drugId) {
        cartService.removeFromCart(userId, drugId);
        return ResponseEntity.ok("Drug removed from cart.");
    }

}