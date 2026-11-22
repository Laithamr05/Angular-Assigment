package com.aurora.products.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank @Size(min = 2, max = 255) String name,
        @NotNull @DecimalMin("0.01") BigDecimal price,
        @NotNull String category) {
}
