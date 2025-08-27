package com.Springboot.online_pharmacy_backend.dto;

import com.Springboot.online_pharmacy_backend.model.Drug;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class CartItemDTO {
    private Long drugId;
    private String drugName;
    private int quantity;
    private double price;
    
    @ManyToOne
    @JoinColumn(name = "drugId", insertable = false, updatable = false)
    private Drug drug;

    // Getter and Setter for drugId
    public Long getDrugId() {
        return drugId;
    }

    public void setDrugId(Long drugId) {
        this.drugId = drugId;
    }

    // Getter and Setter for drugName
    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    // Getter and Setter for quantity
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Getter and Setter for price
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}