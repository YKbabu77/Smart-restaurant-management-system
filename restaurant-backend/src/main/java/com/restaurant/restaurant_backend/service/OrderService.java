package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.dto.OrderDTO;
import com.restaurant.restaurant_backend.dto.OrderDetailsDTO;
import com.restaurant.restaurant_backend.dto.OrderRequest;
import com.restaurant.restaurant_backend.entity.Order;



public interface OrderService {

    Order placeOrder(OrderRequest request);

    List<OrderDTO> getAllOrders();

    Optional<OrderDTO> getOrderById(Long id);

    List<OrderDTO> getOrdersByUser(Long userId);

    Order updateOrder(Long id, Order order);
    OrderDTO updateOrderStatus(Long id, String status);

    void deleteOrder(Long id);
    Optional<OrderDetailsDTO> getOrderDetails(Long id);
}
