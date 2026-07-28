package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.dto.OrderRequest;
import com.restaurant.restaurant_backend.entity.Order;



public interface OrderService {

    Order placeOrder(OrderRequest request);

    List<Order> getAllOrders();

    Optional<Order> getOrderById(Long id);

    List<Order> getOrdersByUser(Long userId);

    Order updateOrder(Long id, Order order);

    void deleteOrder(Long id);
}
