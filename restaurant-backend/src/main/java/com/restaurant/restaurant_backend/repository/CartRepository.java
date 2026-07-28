package com.restaurant.restaurant_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.restaurant_backend.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserIdAndFoodId(Long userId, Long foodId);
    List<Cart> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}