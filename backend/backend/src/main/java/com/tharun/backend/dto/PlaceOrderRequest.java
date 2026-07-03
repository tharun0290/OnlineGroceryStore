package com.tharun.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

/**
 * Place order request DTO.
 */
public class PlaceOrderRequest {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Phone is required")
    private String customerPhone;

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    // Cart items will be fetched from server-side cart, 
    // but we also support passing items directly
    private List<OrderItemRequest> items;

    // Getters and Setters
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}
