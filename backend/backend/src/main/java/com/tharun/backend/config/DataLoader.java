package com.tharun.backend.config;

import com.tharun.backend.entity.*;
import com.tharun.backend.repository.ProductRepository;
import com.tharun.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * Seeds the database with an admin user and sample products on first run.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, ProductRepository productRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed admin user (or update old admin email)
        if (userRepository.existsByEmail("admin@msgrocerystore.com")) {
            // Admin already exists with new email — nothing to do
            System.out.println("✅ Admin user already exists: admin@msgrocerystore.com");
        } else if (userRepository.existsByEmail("admin@seshachalam.com")) {
            // Migrate old admin email to new one
            User oldAdmin = userRepository.findByEmail("admin@seshachalam.com").orElse(null);
            if (oldAdmin != null) {
                oldAdmin.setEmail("admin@msgrocerystore.com");
                oldAdmin.setAddress("M.S Grocery Store, Main Street");
                oldAdmin.setRole(Role.ROLE_ADMIN);
                userRepository.save(oldAdmin);
                System.out.println("✅ Admin email migrated to: admin@msgrocerystore.com / Admin@123");
            }
        } else {
            // Create fresh admin
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@msgrocerystore.com");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setPhone("9876543210");
            admin.setAddress("M.S Grocery Store, Main Street");
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
            System.out.println("✅ Admin user seeded: admin@msgrocerystore.com / Admin@123");
        }

        // Seed sample products if none exist
        if (productRepository.count() == 0) {
            List<Product> products = List.of(
                new Product("Basmati Rice (5kg)", Category.RICE, "Premium aged basmati rice, long grain, aromatic", new BigDecimal("450.00"), 50, null, true),
                new Product("Sona Masoori Rice (10kg)", Category.RICE, "Fine quality everyday rice for South Indian cooking", new BigDecimal("620.00"), 30, null, true),
                new Product("Toor Dal (1kg)", Category.DAL, "Unpolished toor dal, rich in protein", new BigDecimal("160.00"), 40, null, true),
                new Product("Moong Dal (1kg)", Category.DAL, "Split yellow moong dal, easy to digest", new BigDecimal("140.00"), 35, null, true),
                new Product("Sunflower Oil (5L)", Category.OIL, "Refined sunflower oil, heart healthy", new BigDecimal("520.00"), 25, null, true),
                new Product("Groundnut Oil (1L)", Category.OIL, "Cold-pressed groundnut oil, natural flavour", new BigDecimal("230.00"), 20, null, true),
                new Product("Turmeric Powder (200g)", Category.SPICES, "Pure turmeric powder, vibrant color", new BigDecimal("65.00"), 60, null, true),
                new Product("Red Chilli Powder (200g)", Category.SPICES, "Medium spice red chilli powder", new BigDecimal("85.00"), 55, null, true),
                new Product("Cumin Seeds (100g)", Category.SPICES, "Whole cumin seeds, aromatic and fresh", new BigDecimal("95.00"), 45, null, true),
                new Product("Cashew Nuts (250g)", Category.DRY_FRUITS, "Premium whole cashews, W320 grade", new BigDecimal("310.00"), 20, null, true),
                new Product("Almonds (250g)", Category.DRY_FRUITS, "California almonds, crunchy and nutritious", new BigDecimal("280.00"), 15, null, true),
                new Product("Raisins (200g)", Category.DRY_FRUITS, "Golden raisins, seedless", new BigDecimal("120.00"), 30, null, true),
                new Product("Potato Chips (150g)", Category.SNACKS, "Classic salted potato chips", new BigDecimal("40.00"), 100, null, true),
                new Product("Mixture (200g)", Category.SNACKS, "South Indian spicy mixture", new BigDecimal("60.00"), 80, null, true),
                new Product("Full Cream Milk (1L)", Category.DAIRY, "Farm fresh full cream milk", new BigDecimal("58.00"), 50, null, true),
                new Product("Paneer (200g)", Category.DAIRY, "Fresh cottage cheese, soft and creamy", new BigDecimal("90.00"), 20, null, true),
                new Product("Curd (500ml)", Category.DAIRY, "Thick set curd, naturally fermented", new BigDecimal("35.00"), 40, null, true),
                new Product("Filter Coffee Powder (200g)", Category.BEVERAGES, "Traditional South Indian filter coffee", new BigDecimal("180.00"), 25, null, true),
                new Product("Green Tea (25 bags)", Category.BEVERAGES, "Premium green tea, antioxidant rich", new BigDecimal("150.00"), 30, null, true),
                new Product("Tomato (1kg)", Category.VEGETABLES, "Fresh red tomatoes, locally sourced", new BigDecimal("40.00"), 60, null, true),
                new Product("Onion (1kg)", Category.VEGETABLES, "Red onions, firm and fresh", new BigDecimal("35.00"), 70, null, true),
                new Product("Banana (1 dozen)", Category.FRUITS, "Fresh yellow bananas, ripe and sweet", new BigDecimal("50.00"), 40, null, true),
                new Product("Apple (1kg)", Category.FRUITS, "Kashmir apples, crisp and juicy", new BigDecimal("180.00"), 25, null, true),
                new Product("Detergent Powder (1kg)", Category.HOUSEHOLD_ITEMS, "Active clean detergent powder", new BigDecimal("120.00"), 35, null, true),
                new Product("Dish Wash Liquid (500ml)", Category.HOUSEHOLD_ITEMS, "Lemon fresh dish wash gel", new BigDecimal("95.00"), 40, null, true)
            );
            productRepository.saveAll(products);
            System.out.println("✅ 25 sample products seeded");
        }
    }
}
