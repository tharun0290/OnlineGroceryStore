package com.tharun.backend.service;

import com.tharun.backend.dto.ProductRequest;
import com.tharun.backend.dto.ProductResponse;
import com.tharun.backend.entity.Category;
import com.tharun.backend.entity.Product;
import com.tharun.backend.exception.ResourceNotFoundException;
import com.tharun.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Product service — CRUD + filtering.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final FileStorageService fileStorageService;

    public ProductService(ProductRepository productRepository, FileStorageService fileStorageService) {
        this.productRepository = productRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * Get all products with optional filters.
     */
    public List<ProductResponse> getProducts(Category category, BigDecimal minPrice,
                                              BigDecimal maxPrice, Boolean available, String search) {
        List<Product> products;
        if (category == null && minPrice == null && maxPrice == null && available == null && search == null) {
            products = productRepository.findAll();
        } else {
            products = productRepository.findWithFilters(category, minPrice, maxPrice, available, search);
        }
        return products.stream().map(this::toResponse).collect(Collectors.toList());
    }

    /**
     * Get a single product by ID.
     */
    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return toResponse(product);
    }

    /**
     * Create a new product (admin only).
     */
    public ProductResponse createProduct(ProductRequest request, MultipartFile image) {
        Product product = new Product();
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setAvailable(request.getAvailable());

        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            product.setImageUrl(imageUrl);
        }

        product = productRepository.save(product);
        return toResponse(product);
    }

    /**
     * Update an existing product (admin only).
     */
    public ProductResponse updateProduct(Long id, ProductRequest request, MultipartFile image) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setAvailable(request.getAvailable());

        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (product.getImageUrl() != null) {
                fileStorageService.deleteFile(product.getImageUrl());
            }
            String imageUrl = fileStorageService.storeFile(image);
            product.setImageUrl(imageUrl);
        }

        product = productRepository.save(product);
        return toResponse(product);
    }

    /**
     * Delete a product (admin only).
     */
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        if (product.getImageUrl() != null) {
            fileStorageService.deleteFile(product.getImageUrl());
        }

        productRepository.delete(product);
    }

    private ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setCategory(product.getCategory());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setQuantity(product.getQuantity());
        response.setImageUrl(product.getImageUrl());
        response.setAvailable(product.getAvailable());
        response.setCreatedAt(product.getCreatedAt());
        return response;
    }
}
