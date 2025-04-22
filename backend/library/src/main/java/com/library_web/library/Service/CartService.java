package com.library_web.library.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.Book;
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

  public Cart updateCartByUserId(String userId, Cart updatedCart) {
    // Tìm giỏ hàng hiện tại của người dùng
    Cart existingCart = cartRepository.findByUser_Id(userId)
        .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho userId: " + userId));

    // Lấy danh sách sách hiện tại trong giỏ hàng
    List<Book> currentBooks = existingCart.getBooks();

    // Thêm sách mới vào đầu danh sách nếu có
    if (updatedCart.getBooks() != null && !updatedCart.getBooks().isEmpty()) {
        currentBooks.add(0, updatedCart.getBooks().get(0)); // Thêm sách mới vào đầu danh sách
    }

    // Cập nhật lại giỏ hàng với sách đã được thêm
    existingCart.setBooks(currentBooks);

    // Lưu giỏ hàng đã cập nhật vào cơ sở dữ liệu
    return cartRepository.save(existingCart);
}

  public void deleteCart(String cartId) {
    cartRepository.deleteById(cartId);
  }
}
