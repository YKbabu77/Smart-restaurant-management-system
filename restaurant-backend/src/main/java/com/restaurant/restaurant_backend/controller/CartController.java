package com.restaurant.restaurant_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.restaurant_backend.dto.CartDTO;
import com.restaurant.restaurant_backend.dto.CartRequest;
import com.restaurant.restaurant_backend.entity.Cart;
import com.restaurant.restaurant_backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
// @CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add item to cart
    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(request));
    }

    // Get all cart items
    @GetMapping
    public ResponseEntity<List<CartDTO>> getAllCartItems() {
        return ResponseEntity.ok(cartService.getAllCartItems());
    }

    // Get cart item by ID
    @GetMapping("/{id}")
    public ResponseEntity<CartDTO> getCartItemById(@PathVariable Long id) {

        return cartService.getCartItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get cart items by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartDTO>> getCartItemsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItemsByUser(userId));
    }

    // Update cart item
    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long id,
                                               @RequestBody Cart cart) {

        return ResponseEntity.ok(cartService.updateCartItem(id, cart));
    }

    // Delete cart item
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long id) {

        cartService.deleteCartItem(id);

        return ResponseEntity.ok("Cart item deleted successfully.");
    }

    // Clear user's cart
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {

        cartService.clearCart(userId);

        return ResponseEntity.ok("Cart cleared successfully.");
    }
}