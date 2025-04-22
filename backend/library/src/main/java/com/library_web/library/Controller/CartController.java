package com.library_web.library.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library_web.library.Model.Cart;
import com.library_web.library.Service.CartService;

import java.util.List;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable String userId) {
        return cartService.getCartByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart) {
        try {
            return ResponseEntity.ok(cartService.addCart(cart));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PatchMapping("/user/{userId}")
    public ResponseEntity<Cart> updateCartByUserId(@PathVariable String userId, @RequestBody Cart cart) {
        try {
            return ResponseEntity.ok(cartService.updateCartByUserId(userId, cart));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable String id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }

    // API xóa một số sách khỏi giỏ hàng
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Cart> deleteBooksFromCart(@PathVariable String userId, @RequestBody List<String> bookIds) {
        try {
            // Xóa các sách có ID trong danh sách khỏi giỏ hàng và trả về giỏ hàng đã cập
            // nhật
            Cart updatedCart = cartService.deleteBooksFromCart(userId, bookIds);
            return ResponseEntity.ok(updatedCart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
