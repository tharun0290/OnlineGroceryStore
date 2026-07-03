package com.tharun.backend.controller;

import com.tharun.backend.dto.OrderResponse;
import com.tharun.backend.dto.PlaceOrderRequest;
import com.tharun.backend.entity.OrderStatus;
import com.tharun.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Order controller — place orders, view history, update status.
 */
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Place a new order (user).
     */
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            Authentication authentication,
            @Valid @RequestBody PlaceOrderRequest request) {
        return new ResponseEntity<>(
                orderService.placeOrder(authentication.getName(), request),
                HttpStatus.CREATED
        );
    }

    /**
     * Get logged-in user's orders.
     */
    @GetMapping("/user")
    public ResponseEntity<List<OrderResponse>> getUserOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.getUserOrders(authentication.getName()));
    }

    /**
     * Get all orders (admin only — secured in SecurityConfig via /api/v1/admin/** pattern).
     */
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    /**
     * Update order status (admin only).
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        OrderStatus status = OrderStatus.valueOf(request.get("status"));
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
