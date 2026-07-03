package com.tharun.backend.repository;

import com.tharun.backend.entity.Category;
import com.tharun.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    List<Product> findByAvailable(Boolean available);

    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:available IS NULL OR p.available = :available) AND " +
           "(:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Product> findWithFilters(
            @Param("category") Category category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("available") Boolean available,
            @Param("search") String search
    );

    long countByAvailable(Boolean available);
}
