package com.tharun.backend.controller;

import com.tharun.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Public notification endpoint for polling.
 */
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Integer>> getUnreadCount() {
        Map<String, Integer> response = new HashMap<>();
        response.put("count", notificationService.getUnreadCount());
        return ResponseEntity.ok(response);
    }
}
