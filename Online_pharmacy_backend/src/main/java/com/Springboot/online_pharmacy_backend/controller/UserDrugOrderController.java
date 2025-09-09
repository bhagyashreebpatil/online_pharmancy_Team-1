package com.Springboot.online_pharmacy_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> removeDrugByPath(@PathVariable Long userId, @PathVariable Long drugId) {
        cartService.removeFromCart(userId, drugId);
        return ResponseEntity.ok("Drug removed from cart.");
    }

    @PostMapping("/remove")
    public ResponseEntity<CartDTO> removeDrugByPayload(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long drugId = payload.get("drugId");

        if (userId == null || drugId == null) {
            return ResponseEntity.badRequest().body(null);
        }
        cartService.removeFromCart(userId, drugId);
        CartDTO updatedCart = cartService.getCartByUserId(userId);
        System.out.println("Cart after removal: " + updatedCart.getItems().size());
        return ResponseEntity.ok(updatedCart);
    }
}