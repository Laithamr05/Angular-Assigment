package com.aurora.products.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.aurora.products.config.SecurityConfig;
import com.aurora.products.entity.Product;
import com.aurora.products.entity.User;
import com.aurora.products.repository.ProductRepository;
import com.aurora.products.repository.UserRepository;
import com.aurora.products.service.AuthService;
import com.aurora.products.service.ProductService;
import com.jayway.jsonpath.JsonPath;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest({ProductController.class, AuthController.class})
@Import({SecurityConfig.class, ProductService.class, AuthService.class})
@TestPropertySource(properties = {
        "app.jwt.secret=test-secret-that-is-at-least-32-characters-long",
        "app.jwt.expiry-minutes=5"})
class ApiSecurityTest {

    private static final String NEW_PRODUCT = "{\"name\": \"Phone\", \"price\": 99.5, \"category\": \"Electronics\"}";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private ProductRepository productRepository;

    @MockitoBean
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        User admin = new User("admin", passwordEncoder.encode("right-password"));
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(userRepository.existsByUsername("admin")).thenReturn(true);

        Product laptop = new Product("Laptop", new BigDecimal("1500"), "Electronics");
        when(productRepository.findAll(any(Sort.class))).thenReturn(List.of(laptop));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));
    }

    private String loginAndGetToken() throws Exception {
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"admin\", \"password\": \"right-password\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return JsonPath.read(response, "$.token");
    }

    @Test
    void anyoneCanListProducts() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Laptop"))
                .andExpect(jsonPath("$[0].price").value(1500));
    }

    @Test
    void addProductWithoutTokenReturns401() throws Exception {
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(NEW_PRODUCT))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void addProductWithFakeTokenReturns401() throws Exception {
        mockMvc.perform(post("/api/products")
                        .header("Authorization", "Bearer not.a.real.token")
                        .contentType(MediaType.APPLICATION_JSON).content(NEW_PRODUCT))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void loginWithWrongPasswordReturns401() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"admin\", \"password\": \"wrong\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void addProductAfterLoginReturns201() throws Exception {
        mockMvc.perform(post("/api/products")
                        .header("Authorization", "Bearer " + loginAndGetToken())
                        .contentType(MediaType.APPLICATION_JSON).content(NEW_PRODUCT))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Phone"));
    }

    @Test
    void addInvalidProductReturns400() throws Exception {
        mockMvc.perform(post("/api/products")
                        .header("Authorization", "Bearer " + loginAndGetToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"P\", \"price\": 0, \"category\": \"Cars\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void signupReturns201() throws Exception {
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"laith\", \"password\": \"long-enough-pw\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void signupWithTakenUsernameReturns409() throws Exception {
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"admin\", \"password\": \"long-enough-pw\"}"))
                .andExpect(status().isConflict());
    }

    @Test
    void signupWithShortPasswordReturns400() throws Exception {
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"laith\", \"password\": \"short\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void addProductWithUnknownCategoryReturns400() throws Exception {
        mockMvc.perform(post("/api/products")
                        .header("Authorization", "Bearer " + loginAndGetToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Phone\", \"price\": 10, \"category\": \"Cars\"}"))
                .andExpect(status().isBadRequest());
    }
}
