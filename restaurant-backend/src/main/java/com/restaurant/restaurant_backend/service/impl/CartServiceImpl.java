package com.restaurant.restaurant_backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.entity.Cart;
import com.restaurant.restaurant_backend.repository.CartRepository;
import com.restaurant.restaurant_backend.service.CartService;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> getCartItemById(Long id) {
        return cartRepository.findById(id);
    }

    @Override
    public List<Cart> getCartItemsByUser(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public Cart updateCartItem(Long id, Cart cart) {

        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        existingCart.setFood(cart.getFood());
        existingCart.setQuantity(cart.getQuantity());
        existingCart.setPrice(cart.getPrice());

        return cartRepository.save(existingCart);
    }

    @Override
    public void deleteCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}
