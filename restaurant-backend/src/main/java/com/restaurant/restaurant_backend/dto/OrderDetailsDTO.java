package com.restaurant.restaurant_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class OrderDetailsDTO {

    private Long id;
    private Long userId;
    private String customerName;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private String paymentMethod;
    private String paymentStatus;

    private LocalTime pickupTime;
    private LocalTime estimatedReadyTime;
    private String specialInstructions;

    private List<OrderItemDTO> items;

    public OrderDetailsDTO() {
    }

    public OrderDetailsDTO(
            Long id,
            Long userId,
            String customerName,
            LocalDateTime orderDate,
            BigDecimal totalAmount,
            String status,
            String paymentMethod,
            String paymentStatus,
            LocalTime pickupTime,
            LocalTime estimatedReadyTime,
            String specialInstructions,
            List<OrderItemDTO> items) {

        this.id = id;
        this.userId = userId;
        this.customerName = customerName;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.pickupTime = pickupTime;
        this.estimatedReadyTime = estimatedReadyTime;
        this.specialInstructions = specialInstructions;
        this.items = items;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalTime getPickupTime() { return pickupTime; }
    public void setPickupTime(LocalTime pickupTime) { this.pickupTime = pickupTime; }

    public LocalTime getEstimatedReadyTime() { return estimatedReadyTime; }
    public void setEstimatedReadyTime(LocalTime estimatedReadyTime) { this.estimatedReadyTime = estimatedReadyTime; }

    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }

    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }

}