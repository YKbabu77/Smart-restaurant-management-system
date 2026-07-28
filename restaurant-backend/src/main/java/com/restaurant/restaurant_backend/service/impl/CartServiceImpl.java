package com.restaurant.restaurant_backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.CartRequest;
import com.restaurant.restaurant_backend.entity.Cart;
import com.restaurant.restaurant_backend.entity.Food;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.repository.CartRepository;
import com.restaurant.restaurant_backend.repository.FoodRepository;
import com.restaurant.restaurant_backend.repository.UserRepository;
import com.restaurant.restaurant_backend.service.CartService;
@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addToCart(CartRequest request) {

    User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Food food = foodRepository.findById(request.getFoodId())
            .orElseThrow(() -> new RuntimeException("Food not found"));

    Cart cart = new Cart();

    cart.setUser(user);
    cart.setFood(food);
    cart.setQuantity(request.getQuantity());
    cart.setPrice(food.getPrice());

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

        existingCart.setQuantity(cart.getQuantity());

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
