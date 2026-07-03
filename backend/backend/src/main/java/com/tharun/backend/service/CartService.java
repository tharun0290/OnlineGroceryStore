package com.tharun.backend.service;

import com.tharun.backend.dto.CartItemRequest;
import com.tharun.backend.dto.CartItemResponse;
import com.tharun.backend.entity.CartItem;
import com.tharun.backend.entity.Product;
import com.tharun.backend.entity.User;
import com.tharun.backend.exception.ResourceNotFoundException;
import com.tharun.backend.repository.CartItemRepository;
import com.tharun.backend.repository.ProductRepository;
import com.tharun.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Cart service — server-side cart management.
 */
@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get all cart items for a user.
     */
    public List<CartItemResponse> getCartItems(String email) {
        User user = getUserByEmail(email);
        return cartItemRepository.findByUserId(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    /**
     * Add or update a cart item.
     */
    public CartItemResponse addOrUpdateCartItem(String email, CartItemRequest request) {
        User user = getUserByEmail(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(user.getId(), product.getId());

        CartItem cartItem;
        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            cartItem.setQuantity(request.getQuantity());
        } else {
            cartItem = new CartItem(user, product, request.getQuantity());
        }

        cartItem = cartItemRepository.save(cartItem);
        return toResponse(cartItem);
    }

    /**
     * Remove a cart item.
     */
    public void removeCartItem(String email, Long cartItemId) {
        User user = getUserByEmail(email);
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Cart item not found");
        }

        cartItemRepository.delete(cartItem);
    }

    /**
     * Clear all cart items for a user.
     */
    @Transactional
    public void clearCart(String email) {
        User user = getUserByEmail(email);
        cartItemRepository.deleteByUserId(user.getId());
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private CartItemResponse toResponse(CartItem item) {
        CartItemResponse response = new CartItemResponse();
        response.setId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setProductImageUrl(item.getProduct().getImageUrl());
        response.setProductPrice(item.getProduct().getPrice());
        response.setProductAvailable(item.getProduct().getAvailable());
        response.setQuantity(item.getQuantity());
        response.setSubtotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return response;
    }
}
