package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.dto.CartDTO;
import com.restaurant.restaurant_backend.dto.CartRequest;
import com.restaurant.restaurant_backend.entity.Cart;

public interface CartService {

    Cart addToCart(CartRequest request);

    List<CartDTO> getAllCartItems();

    Optional<CartDTO> getCartItemById(Long id);

    List<CartDTO> getCartItemsByUser(Long userId);

    Cart updateCartItem(Long id, Cart cart);

    void deleteCartItem(Long id);

    void clearCart(Long userId);
}
