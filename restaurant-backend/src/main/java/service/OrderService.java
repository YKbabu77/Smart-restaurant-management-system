package service;

import java.util.List;
import java.util.Optional;

import entity.Order;

public interface OrderService {

    Order saveOrder(Order order);

    List<Order> getAllOrders();

    Optional<Order> getOrderById(Long id);

    List<Order> getOrdersByUser(Long userId);

    Order updateOrder(Long id, Order order);

    void deleteOrder(Long id);
}
