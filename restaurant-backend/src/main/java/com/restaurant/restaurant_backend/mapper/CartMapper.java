package com.restaurant.restaurant_backend.mapper;

import java.math.BigDecimal;

import com.restaurant.restaurant_backend.dto.CartDTO;
import com.restaurant.restaurant_backend.entity.Cart;

public class CartMapper {

    public static CartDTO toDTO(Cart cart) {

        if (cart == null) {
            return null;
        }

        BigDecimal totalPrice =
                cart.getPrice().multiply(BigDecimal.valueOf(cart.getQuantity()));

        return new CartDTO(
                cart.getId(),
                cart.getUser().getId(),
                cart.getFood().getId(),
                cart.getFood().getName(),
                cart.getFood().getImageUrl(),
                cart.getPrice(),
                cart.getQuantity(),
                totalPrice,
                cart.getAddedAt()
        );
    }
}