package com.restaurant.restaurant_backend.dto;

import java.math.BigDecimal;

public class OrderItemDTO {

    private Long id;

    private Long foodId;
    private String foodName;
    private String foodImageUrl;

    private Integer quantity;
    private BigDecimal price;

    public OrderItemDTO() {
    }

    public OrderItemDTO(Long id,
                        Long foodId,
                        String foodName,
                        String foodImageUrl,
                        Integer quantity,
                        BigDecimal price) {

        this.id = id;
        this.foodId = foodId;
        this.foodName = foodName;
        this.foodImageUrl = foodImageUrl;
        this.quantity = quantity;
        this.price = price;
    }

    // Generate Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

}