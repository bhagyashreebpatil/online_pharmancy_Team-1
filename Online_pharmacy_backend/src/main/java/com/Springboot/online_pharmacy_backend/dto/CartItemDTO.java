package com.Springboot.online_pharmacy_backend.dto;

import com.Springboot.online_pharmacy_backend.model.Drug;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class CartItemDTO {
    private Long drugId;
    private String drugName;
    private String type;
    private String imageUrl;
    private double price;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "drugId", insertable = false, updatable = false)
    private Drug drug;

    public Long getDrugId() { return drugId; }
    public void setDrugId(Long drugId) { this.drugId = drugId; }

    public String getDrugName() { return drugName; }
    public void setDrugName(String drugName) { this.drugName = drugName; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

}