package com.tharun.backend.dto;

/**
 * Authentication response DTO — returned after login/register.
 */
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String name;
    private String role;
    private Long userId;

    public AuthResponse(String token, String email, String name, String role, Long userId) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.role = role;
        this.userId = userId;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
