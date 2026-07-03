package com.tharun.backend.controller;

import com.tharun.backend.dto.ProductRequest;
import com.tharun.backend.dto.ProductResponse;
import com.tharun.backend.entity.Category;
import com.tharun.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

/**
 * Product controller — CRUD + filtering.
 * GET endpoints are public; POST/PUT/DELETE are admin-only (via SecurityConfig).
 */
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getProducts(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean available,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.getProducts(category, minPrice, maxPrice, available, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @ModelAttribute ProductRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        return new ResponseEntity<>(productService.createProduct(request, image), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @ModelAttribute ProductRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        return ResponseEntity.ok(productService.updateProduct(id, request, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
