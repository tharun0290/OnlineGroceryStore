package com.tharun.backend.controller;

import com.tharun.backend.dto.DashboardStats;
import com.tharun.backend.dto.OrderResponse;
import com.tharun.backend.service.DashboardService;
import com.tharun.backend.service.NotificationService;
import com.tharun.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Admin dashboard controller — stats and notifications.
 */
@RestController
@RequestMapping("/api/v1/admin")
public class DashboardController {

    private final DashboardService dashboardService;
    private final OrderService orderService;
    private final NotificationService notificationService;

    public DashboardController(DashboardService dashboardService, OrderService orderService,
                               NotificationService notificationService) {
        this.dashboardService = dashboardService;
        this.orderService = orderService;
        this.notificationService = notificationService;
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/notifications")
    public ResponseEntity<Map<String, Object>> getNotifications() {
        Map<String, Object> response = new HashMap<>();
        response.put("notifications", notificationService.getNotifications());
        response.put("unreadCount", notificationService.getUnreadCount());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/notifications/read")
    public ResponseEntity<Void> markNotificationsAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok().build();
    }
}
