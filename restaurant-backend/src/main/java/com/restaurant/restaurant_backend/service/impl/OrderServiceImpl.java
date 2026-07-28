package com.restaurant.restaurant_backend.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.OrderRequest;
import com.restaurant.restaurant_backend.entity.Cart;
import com.restaurant.restaurant_backend.entity.Order;
import com.restaurant.restaurant_backend.entity.OrderItem;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.repository.CartRepository;
import com.restaurant.restaurant_backend.repository.OrderItemRepository;
import com.restaurant.restaurant_backend.repository.OrderRepository;
import com.restaurant.restaurant_backend.repository.UserRepository;
import com.restaurant.restaurant_backend.service.OrderService;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    @Transactional
    public Order placeOrder(OrderRequest request) {
    
    System.out.println(">>> placeOrder() method called <<<");
    
    User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println("User Found: " + user.getId());

    List<Cart> cartItems = cartRepository.findByUserId(request.getUserId());

    System.out.println("Cart Size: " + cartItems.size());

    if (cartItems.isEmpty()) {
        throw new RuntimeException("Cart is empty");
    }

    BigDecimal total = BigDecimal.ZERO;

    for (Cart cart : cartItems) {
        System.out.println("Food: " + cart.getFood().getName());

        total = total.add(
                cart.getPrice().multiply(
                        BigDecimal.valueOf(cart.getQuantity())
                )
        );
    }

    System.out.println("Total: " + total);

    Order order = new Order();

    order.setUser(user);
    order.setTotalAmount(total);
    order.setDeliveryAddress(request.getDeliveryAddress());
    order.setPaymentMethod(request.getPaymentMethod());

    order = orderRepository.save(order);

    System.out.println("Order Saved: " + order.getId());

    for (Cart cart : cartItems) {

        System.out.println("Saving Order Item...");

        OrderItem item = new OrderItem();

        item.setOrder(order);
        item.setFood(cart.getFood());
        item.setQuantity(cart.getQuantity());
        item.setPrice(cart.getPrice());

        orderItemRepository.save(item);
    }

    System.out.println("Deleting Cart...");

    cartRepository.deleteByUserId(request.getUserId());

    System.out.println("===== PLACE ORDER END =====");

    return order;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    @Override
    public Order updateOrder(Long id, Order order) {

        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setOrderDate(order.getOrderDate());
        existingOrder.setTotalAmount(order.getTotalAmount());
        existingOrder.setStatus(order.getStatus());
        existingOrder.setPaymentMethod(order.getPaymentMethod());
        existingOrder.setPaymentStatus(order.getPaymentStatus());
        existingOrder.setDeliveryAddress(order.getDeliveryAddress());

        return orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
