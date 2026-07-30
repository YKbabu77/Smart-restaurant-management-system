package com.restaurant.restaurant_backend.mapper;

import java.util.List;

import com.restaurant.restaurant_backend.dto.OrderDTO;
import com.restaurant.restaurant_backend.dto.OrderDetailsDTO;
import com.restaurant.restaurant_backend.dto.OrderItemDTO;
import com.restaurant.restaurant_backend.entity.Order;
import com.restaurant.restaurant_backend.entity.OrderItem;

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
    public static OrderItemDTO toItemDTO(OrderItem item) {

    return new OrderItemDTO(

            item.getId(),

            item.getFood().getId(),

            item.getFood().getName(),

            item.getFood().getImageUrl(),

            item.getQuantity(),

            item.getPrice()

    );
    }
    public static OrderDetailsDTO toDetailsDTO(Order order) {

    List<OrderItemDTO> items =

            order.getOrderItems()

                    .stream()

                    .map(OrderMapper::toItemDTO)

                    .toList();

    return new OrderDetailsDTO(

            order.getId(),

            order.getUser().getId(),

            order.getUser().getFullName(),

            order.getOrderDate(),

            order.getTotalAmount(),

            order.getStatus().name(),

            order.getPaymentMethod().name(),

            order.getPaymentStatus().name(),

            order.getDeliveryAddress(),

            items

    );

    }
}
