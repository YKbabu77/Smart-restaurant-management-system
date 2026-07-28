package com.restaurant.restaurant_backend.mapper;

import com.restaurant.restaurant_backend.dto.OrderItemDTO;
import com.restaurant.restaurant_backend.entity.OrderItem;

public class OrderItemMapper {

    public static OrderItemDTO toDTO(OrderItem orderItem) {

        if (orderItem == null) {
            return null;
        }

        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getFood().getId(),
                orderItem.getFood().getName(),
                orderItem.getFood().getImageUrl(),
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }
}