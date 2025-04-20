package com.library_web.library.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.Cart;
import com.library_web.library.Respository.CartRepo;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
  private final CartRepo cartRepository;

  public List<Cart> getAllCarts() {
    return cartRepository.findAll();
  }

  public Optional<Cart> getCartByUserId(String userId) {
    return cartRepository.findByUser_Id(userId);
  }

  public Cart addCart(Cart cart) {
    // Check if user already has a cart
    Optional<Cart> existingCart = cartRepository.findByUser_Id(cart.getUser().getId());
    if (existingCart.isPresent()) {
      throw new RuntimeException("User already has a cart. Use update instead.");
    }
    return cartRepository.save(cart);
  }

  public Cart updateCart(String id, Cart cart) {
    return cartRepository.findById(id)
        .map(existingCart -> {
          // Cập nhật các thuộc tính cụ thể nếu có trong Cart, ví dụ như chỉ cập nhật danh sách sách:
          if (cart.getBooks() != null) {
            existingCart.setBooks(cart.getBooks());
          }
          return cartRepository.save(existingCart);
        })
        .orElseThrow(() -> new RuntimeException("Cart not found"));
  }

  public void deleteCart(String cartId) {
    cartRepository.deleteById(cartId);
  }
}
