package service;

import java.util.List;
import java.util.Optional;

import entity.Cart;

public interface CartService {

    Cart saveCart(Cart cart);

    List<Cart> getAllCartItems();

    Optional<Cart> getCartItemById(Long id);

    List<Cart> getCartItemsByUser(Long userId);

    Cart updateCartItem(Long id, Cart cart);

    void deleteCartItem(Long id);

    void clearCart(Long userId);
}
