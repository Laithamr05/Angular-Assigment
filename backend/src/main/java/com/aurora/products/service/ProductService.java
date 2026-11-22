package com.aurora.products.service;

import com.aurora.products.dto.ProductRequest;
import com.aurora.products.entity.Product;
import com.aurora.products.repository.ProductRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

    private static final List<String> CATEGORIES = List.of("Electronics", "Clothes", "Books", "Food", "Other");

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll(Sort.by("id"));
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    public Product createProduct(ProductRequest request) {
        checkCategory(request.category());
        Product product = new Product(request.name().trim(), request.price(), request.category());
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequest request) {
        checkCategory(request.category());
        Product product = getProductById(id);
        product.setName(request.name().trim());
        product.setPrice(request.price());
        product.setCategory(request.category());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    private void checkCategory(String category) {
        if (!CATEGORIES.contains(category)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category");
        }
    }
}
