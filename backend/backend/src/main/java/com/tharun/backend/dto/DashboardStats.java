package com.tharun.backend.dto;

/**
 * Dashboard statistics DTO for admin dashboard.
 */
public class DashboardStats {
    private long totalProducts;
    private long availableProducts;
    private long unavailableProducts;
    private long totalOrders;
    private long pendingOrders;
    private long deliveredOrders;

    // Getters and Setters
    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public long getAvailableProducts() { return availableProducts; }
    public void setAvailableProducts(long availableProducts) { this.availableProducts = availableProducts; }

    public long getUnavailableProducts() { return unavailableProducts; }
    public void setUnavailableProducts(long unavailableProducts) { this.unavailableProducts = unavailableProducts; }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public long getPendingOrders() { return pendingOrders; }
    public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }

    public long getDeliveredOrders() { return deliveredOrders; }
    public void setDeliveredOrders(long deliveredOrders) { this.deliveredOrders = deliveredOrders; }
}
