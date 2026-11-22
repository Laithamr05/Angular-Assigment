package com.aurora.products.config;

import com.aurora.products.entity.Product;
import com.aurora.products.entity.User;
import com.aurora.products.repository.ProductRepository;
import com.aurora.products.repository.UserRepository;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Runs once when the app starts: adds the admin user and some sample products if they are missing
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.demo.username}")
    private String demoUsername;

    @Value("${app.demo.password}")
    private String demoPassword;

    public DataSeeder(UserRepository userRepository, ProductRepository productRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (demoPassword.isBlank()) {
            throw new IllegalStateException("DEMO_PASSWORD must be set in the .env file");
        }

        if (!userRepository.existsByUsername(demoUsername)) {
            userRepository.save(new User(demoUsername, passwordEncoder.encode(demoPassword)));
        }

        if (productRepository.count() == 0) {
            productRepository.save(new Product("Laptop", new BigDecimal("1500"), "Electronics"));
            productRepository.save(new Product("T-Shirt", new BigDecimal("20"), "Clothes"));
            productRepository.save(new Product("Angular Book", new BigDecimal("45"), "Books"));
        }
    }
}
