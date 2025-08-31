package com.Springboot.online_pharmacy_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.Springboot.online_pharmacy_backend.dto.CartDTO;
import com.Springboot.online_pharmacy_backend.dto.CartItemDTO;
import com.Springboot.online_pharmacy_backend.dto.DrugOrderRequest;
import com.Springboot.online_pharmacy_backend.model.CartItem;
import com.Springboot.online_pharmacy_backend.model.Drug;
import com.Springboot.online_pharmacy_backend.repository.CartItemRepository;
import com.Springboot.online_pharmacy_backend.repository.DrugRepository;
import com.Springboot.online_pharmacy_backend.repository.UserRepository;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
    private CartItemRepository cartItemRepository;

	@Autowired
	private UserRepository userRepository;

	
    @Autowired
    private DrugRepository drugRepository;

//    @Override
//    public void addToCart(DrugOrderRequest request) {
//    	CartItem existingItem = cartItemRepository
//                .findByUserIdAndDrugId(request.getUserId(), request.getDrugId())
//                .orElse(null);
//
//            if (existingItem != null) {
//                existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
//                cartItemRepository.save(existingItem);
//            }else {	
//		        CartItem item = new CartItem();
//		        item.setUserId(request.getUserId());
//		        item.setDrugId(request.getDrugId());
//		        item.setQuantity(request.getQuantity());
//		        cartItemRepository.save(item);
//            }
//    }
    
    @Override
    public void addToCart(DrugOrderRequest request) {
    	
    	if (request.getUserId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }

        List<CartItem> items = cartItemRepository.findAllByUserIdAndDrugId(request.getUserId(), request.getDrugId());
        CartItem item = items.isEmpty() ? null : items.get(0);

        if (item != null) {
            item.setQuantity(item.getQuantity() + request.getQuantity());
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setUserId(request.getUserId());
            newItem.setDrugId(request.getDrugId());
            newItem.setQuantity(request.getQuantity());
            cartItemRepository.save(newItem);
        }
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        List<CartItemDTO> dtoList = new ArrayList<>();

        for (CartItem item : items) {
//            Drug drug = item.getDrug();
        	 Drug drug = drugRepository.findById(item.getDrugId()).orElse(null);
            if (drug != null) {
                CartItemDTO dto = new CartItemDTO();
                dto.setDrugId(drug.getId());
                dto.setDrugName(drug.getName());
                dto.setType(drug.getType());
                dto.setImageUrl(drug.getImageUrl());
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
