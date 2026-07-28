package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.dto.OrderItemDTO;
import com.restaurant.restaurant_backend.entity.OrderItem;

public interface OrderItemService {

    OrderItem saveOrderItem(OrderItem orderItem);

    List<OrderItemDTO> getAllOrderItems();

    Optional<OrderItemDTO> getOrderItemById(Long id);

    List<OrderItemDTO> getOrderItemsByOrder(Long orderId);

    OrderItem updateOrderItem(Long id, OrderItem orderItem);

    void deleteOrderItem(Long id);
}
