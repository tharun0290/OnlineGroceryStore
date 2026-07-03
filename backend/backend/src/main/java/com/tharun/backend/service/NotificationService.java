package com.tharun.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * In-memory notification service for admin order notifications.
 * Uses polling-based approach (admin dashboard polls for new notifications).
 */
@Service
public class NotificationService {

    private final List<Notification> notifications = new CopyOnWriteArrayList<>();

    public void addNotification(String message, Long orderId) {
        notifications.add(0, new Notification(message, orderId, LocalDateTime.now(), false));
    }

    public List<Notification> getNotifications() {
        return new ArrayList<>(notifications);
    }

    public List<Notification> getUnreadNotifications() {
        return notifications.stream()
                .filter(n -> !n.isRead())
                .toList();
    }

    public void markAllAsRead() {
        notifications.forEach(n -> n.setRead(true));
    }

    public int getUnreadCount() {
        return (int) notifications.stream().filter(n -> !n.isRead()).count();
    }

    /**
     * Simple notification data class.
     */
    public static class Notification {
        private String message;
        private Long orderId;
        private LocalDateTime timestamp;
        private boolean read;

        public Notification(String message, Long orderId, LocalDateTime timestamp, boolean read) {
            this.message = message;
            this.orderId = orderId;
            this.timestamp = timestamp;
            this.read = read;
        }

        public String getMessage() { return message; }
        public Long getOrderId() { return orderId; }
        public LocalDateTime getTimestamp() { return timestamp; }
        public boolean isRead() { return read; }
        public void setRead(boolean read) { this.read = read; }
    }
}
