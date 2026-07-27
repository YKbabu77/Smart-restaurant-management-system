package service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.OrderItem;
import repository.OrderItemRepository;
import service.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepository.findById(id);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrder(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
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
