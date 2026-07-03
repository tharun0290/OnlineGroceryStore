package com.tharun.backend.service;

import com.tharun.backend.dto.*;
import com.tharun.backend.entity.*;
import com.tharun.backend.exception.BadRequestException;
import com.tharun.backend.exception.ResourceNotFoundException;
import com.tharun.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Order service — place orders, manage statuses, view order history.
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository,
                        ProductRepository productRepository, UserRepository userRepository,
                        NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    /**
     * Place a new order from the user's cart.
     */
    @Transactional
    public OrderResponse placeOrder(String email, PlaceOrderRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Get cart items
        List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty. Add items before placing an order.");
        }

        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setStatus(OrderStatus.PLACED);
        order.setOrderDate(LocalDateTime.now());

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            if (!product.getAvailable()) {
                throw new BadRequestException("Product '" + product.getName() + "' is currently unavailable");
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        order = orderRepository.save(order);

        // Clear cart after placing order
        cartItemRepository.deleteByUserId(user.getId());

        // Notify admin
        notificationService.addNotification("New Order from " + request.getCustomerName(), order.getId());

        return toResponse(order);
    }

    /**
     * Get all orders for admin.
     */
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    /**
     * Get orders for a specific user.
     */
    public List<OrderResponse> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserIdOrderByOrderDateDesc(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    /**
     * Update order status (admin only).
     */
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        order.setStatus(status);
        order = orderRepository.save(order);
        return toResponse(order);
    }

    private OrderResponse toResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUser().getId());
        response.setCustomerName(order.getCustomerName());
        response.setCustomerPhone(order.getCustomerPhone());
        response.setDeliveryAddress(order.getDeliveryAddress());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        response.setOrderDate(order.getOrderDate());

        List<OrderItemResponse> items = order.getOrderItems().stream().map(item -> {
            OrderItemResponse itemResponse = new OrderItemResponse();
            itemResponse.setId(item.getId());
            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setProductImageUrl(item.getProduct().getImageUrl());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setPrice(item.getPrice());
            return itemResponse;
        }).collect(Collectors.toList());

        response.setItems(items);
        return response;
    }
}
