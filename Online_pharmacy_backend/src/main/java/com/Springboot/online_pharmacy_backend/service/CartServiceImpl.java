package com.Springboot.online_pharmacy_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Springboot.online_pharmacy_backend.dto.CartDTO;
import com.Springboot.online_pharmacy_backend.dto.CartItemDTO;
import com.Springboot.online_pharmacy_backend.dto.DrugOrderRequest;
import com.Springboot.online_pharmacy_backend.model.CartItem;
import com.Springboot.online_pharmacy_backend.model.Drug;
import com.Springboot.online_pharmacy_backend.repository.CartItemRepository;
import com.Springboot.online_pharmacy_backend.repository.DrugRepository;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
    private CartItemRepository cartItemRepository;


    @Autowired
    private DrugRepository drugRepository;

    @Override
    public void addToCart(DrugOrderRequest request) {
        CartItem item = new CartItem();
        item.setUserId(request.getUserId());
        item.setDrugId(request.getDrugId());
        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        List<CartItemDTO> dtoList = new ArrayList<>();

        for (CartItem item : items) {
            Drug drug = item.getDrug();
            if (drug != null) {
                CartItemDTO dto = new CartItemDTO();
                dto.setDrugId(drug.getId());
                dto.setDrugName(drug.getName());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(drug.getPrice());
                dtoList.add(dto);
            }
        }

        CartDTO cart = new CartDTO();
        cart.setUserId(userId);
        cart.setItems(dtoList);
        cart.setTotalAmount(dtoList.stream()
            .mapToDouble(i -> i.getPrice() * i.getQuantity())
            .sum());

        return cart;
    }

    @Override
    public void removeFromCart(Long userId, Long drugId) {
        cartItemRepository.deleteByUserIdAndDrugId(userId, drugId);
    }

}
