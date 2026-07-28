package com.restaurant.restaurant_backend.mapper;

import com.restaurant.restaurant_backend.dto.OrderDTO;
import com.restaurant.restaurant_backend.entity.Order;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {

        if (order == null) {
            return null;
        }

        return new OrderDTO(
                order.getId(),
                order.getUser().getId(),
                order.getUser().getFullName(),
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getPaymentMethod().name(),
                order.getPaymentStatus().name(),
                order.getDeliveryAddress()
        );
    }
}
