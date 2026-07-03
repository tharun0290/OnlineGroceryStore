package com.tharun.backend.service;

import com.tharun.backend.dto.DashboardStats;
import com.tharun.backend.entity.OrderStatus;
import com.tharun.backend.repository.OrderRepository;
import com.tharun.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

/**
 * Dashboard service — aggregated stats for admin dashboard.
 */
@Service
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DashboardService(ProductRepository productRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalProducts(productRepository.count());
        stats.setAvailableProducts(productRepository.countByAvailable(true));
        stats.setUnavailableProducts(productRepository.countByAvailable(false));
        stats.setTotalOrders(orderRepository.count());
        stats.setPendingOrders(orderRepository.countByStatusNot(OrderStatus.DELIVERED));
        stats.setDeliveredOrders(orderRepository.countByStatus(OrderStatus.DELIVERED));
        return stats;
    }
}
