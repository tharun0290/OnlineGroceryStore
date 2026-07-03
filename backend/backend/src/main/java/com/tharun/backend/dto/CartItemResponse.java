package com.tharun.backend.dto;

import java.math.BigDecimal;

/**
 * Cart item response DTO.
 */
public class CartItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private BigDecimal productPrice;
    private Boolean productAvailable;
    private Integer quantity;
    private BigDecimal subtotal;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }

    public BigDecimal getProductPrice() { return productPrice; }
    public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }

    public Boolean getProductAvailable() { return productAvailable; }
    public void setProductAvailable(Boolean productAvailable) { this.productAvailable = productAvailable; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
}
