package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.entity.OrderItem;

public interface OrderItemService {

    OrderItem saveOrderItem(OrderItem orderItem);

    List<OrderItem> getAllOrderItems();

    Optional<OrderItem> getOrderItemById(Long id);

    List<OrderItem> getOrderItemsByOrder(Long orderId);

    OrderItem updateOrderItem(Long id, OrderItem orderItem);

    void deleteOrderItem(Long id);
}
