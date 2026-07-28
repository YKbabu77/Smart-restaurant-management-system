package com.restaurant.restaurant_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CartDTO {

    private Long id;

    private Long userId;

    private Long foodId;
    private String foodName;
    private String foodImageUrl;

    private BigDecimal price;
    private Integer quantity;
    private BigDecimal totalPrice;

    private LocalDateTime addedAt;

    public CartDTO() {
    }

    public CartDTO(Long id,
                   Long userId,
                   Long foodId,
                   String foodName,
                   String foodImageUrl,
                   BigDecimal price,
                   Integer quantity,
                   BigDecimal totalPrice,
                   LocalDateTime addedAt) {

        this.id = id;
        this.userId = userId;
        this.foodId = foodId;
        this.foodName = foodName;
        this.foodImageUrl = foodImageUrl;
        this.price = price;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.addedAt = addedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFoodImageUrl() {
        return foodImageUrl;
    }

    public void setFoodImageUrl(String foodImageUrl) {
        this.foodImageUrl = foodImageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    // Generate Getters & Setters
    
}