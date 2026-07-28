package com.restaurant.restaurant_backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.OrderItemDTO;
import com.restaurant.restaurant_backend.entity.OrderItem;
import com.restaurant.restaurant_backend.mapper.OrderItemMapper;
import com.restaurant.restaurant_backend.repository.OrderItemRepository;
import com.restaurant.restaurant_backend.service.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItemDTO> getAllOrderItems() {
        return orderItemRepository.findAll()  .stream()
            .map(OrderItemMapper::toDTO)
            .toList();
    }

    @Override
    public Optional<OrderItemDTO> getOrderItemById(Long id) {
        OrderItem orderItem = orderItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Food not found"));
        return Optional.of(OrderItemMapper.toDTO(orderItem));
        // return orderItemRepository.findById(id);
    }

    @Override
    public List<OrderItemDTO> getOrderItemsByOrder(Long orderId) {
        return orderItemRepository.findByOrderId(orderId)
            .stream()
            .map(OrderItemMapper::toDTO)
            .toList();
    }

    @Override
    public OrderItem updateOrderItem(Long id, OrderItem orderItem) {

        OrderItem existingOrderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order item not found"));

        existingOrderItem.setOrder(orderItem.getOrder());
        existingOrderItem.setFood(orderItem.getFood());
        existingOrderItem.setQuantity(orderItem.getQuantity());
        existingOrderItem.setPrice(orderItem.getPrice());

        return orderItemRepository.save(existingOrderItem);
    }

    @Override
    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}
