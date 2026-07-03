package com.tharun.backend.service;

import com.tharun.backend.dto.UpdateUserRequest;
import com.tharun.backend.dto.UserResponse;
import com.tharun.backend.entity.User;
import com.tharun.backend.exception.ResourceNotFoundException;
import com.tharun.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * User service — profile management.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get user profile by email.
     */
    public UserResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return toResponse(user);
    }

    /**
     * Update user profile.
     */
    public UserResponse updateProfile(String email, UpdateUserRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getName() != null) user.setName(request.getName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());

        user = userRepository.save(user);
        return toResponse(user);
    }

    private UserResponse toResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setAddress(user.getAddress());
        response.setRole(user.getRole().name());
        return response;
    }
}
