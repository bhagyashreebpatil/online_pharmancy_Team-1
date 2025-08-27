package com.Springboot.online_pharmacy_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Springboot.online_pharmacy_backend.dto.CartDTO;
import com.Springboot.online_pharmacy_backend.dto.CartItemDTO;
import com.Springboot.online_pharmacy_backend.dto.DrugOrderRequest;
import com.Springboot.online_pharmacy_backend.model.Drug;
import com.Springboot.online_pharmacy_backend.repository.DrugRepository;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private DrugRepository drugRepository;

    @Override
    public void addToCart(DrugOrderRequest request) {
        System.out.println("Added drug " + request.getDrugId() + " to cart for user " + request.getUserId());
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        List<CartItemDTO> items = new ArrayList<>();
        Drug drug = drugRepository.findById(1L).orElse(null);
        if (drug != null) {
            CartItemDTO item = new CartItemDTO();
            item.setDrugId(drug.getId());
            item.setDrugName(drug.getName());
            item.setQuantity(2);
            item.setPrice(drug.getPrice());
            items.add(item);
        }

        CartDTO cart = new CartDTO();
        cart.setUserId(userId);
        cart.setItems(items);
        cart.setTotalAmount(items.stream()
            .mapToDouble(i -> i.getPrice() * i.getQuantity())
            .sum());

        return cart;
    }
}
