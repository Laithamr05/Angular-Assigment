package com.aurora.products.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

// Data the frontend sends when adding or editing a product (same rules as the Angular forms)
public record ProductRequest(
        @NotBlank @Size(min = 2, max = 255) String name,
        @NotNull @DecimalMin("0.01") BigDecimal price,
        @NotNull @Pattern(regexp = "Electronics|Clothes|Books|Food|Other") String category) {
}
