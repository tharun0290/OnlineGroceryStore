package com.tharun.backend.controller;

import com.tharun.backend.dto.CartItemRequest;
import com.tharun.backend.dto.CartItemResponse;
import com.tharun.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Cart controller — server-side cart management.
 */
@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCart(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCartItems(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<CartItemResponse> addOrUpdateCartItem(
            Authentication authentication,
            @Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartService.addOrUpdateCartItem(authentication.getName(), request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeCartItem(
            Authentication authentication,
            @PathVariable Long id) {
        cartService.removeCartItem(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
