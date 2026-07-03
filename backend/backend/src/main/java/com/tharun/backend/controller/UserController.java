package com.tharun.backend.controller;

import com.tharun.backend.dto.UpdateUserRequest;
import com.tharun.backend.dto.UserResponse;
import com.tharun.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * User controller — profile management.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.updateProfile(authentication.getName(), request));
    }
}
