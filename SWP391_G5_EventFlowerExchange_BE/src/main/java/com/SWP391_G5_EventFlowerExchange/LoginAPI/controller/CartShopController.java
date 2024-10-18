package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.NotEnoughProductsInStockException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.CartShopService;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FlowerBatchSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/cart")
public class CartShopController {
    private final CartShopService cartShopService;
    private final FlowerBatchSerivice flowerBatchSerivice;

    @Autowired
    public CartShopController(CartShopService cartShopService, FlowerBatchSerivice flowerBatchSerivice) {
        this.cartShopService = cartShopService;
        this.flowerBatchSerivice = flowerBatchSerivice;
    }

    // API to get current shopping cart details
    @GetMapping("/shoppingCart")
    public ApiResponse<Map<String, Object>> getShoppingCart() {
        Map<String, Object> response = new HashMap<>();
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());

        return new ApiResponse<>(1000, "Shopping cart retrieved successfully", response);
    }

    // API to add product to shopping cart
    @GetMapping("/shoppingCart/addProduct/{flowerID}")
    public ApiResponse<Map<String, Object>> addProductToCart(@PathVariable("flowerID") int flowerID) {
        flowerBatchSerivice.getFlowerBatchById(flowerID).ifPresent(cartShopService::addPost);

        Map<String, Object> response = new HashMap<>();
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());

        return new ApiResponse<>(1000, "Product added to cart successfully", response);
    }

    // API to remove product from shopping cart
    @GetMapping("/shoppingCart/removeProduct/{flowerID}")
    public ApiResponse<Map<String, Object>> removeProductFromCart(@PathVariable("flowerID") int flowerID) {
        flowerBatchSerivice.getFlowerBatchById(flowerID).ifPresent(cartShopService::removeFlowerBatch);
        return getShoppingCart();
    }

    // API to checkout the shopping cart
    @GetMapping("/shoppingCart/checkout")
    public ApiResponse<Map<String, Object>> checkout() {
        Map<String, Object> response = new HashMap<>();
        try {
            cartShopService.checkout();
            response.put("status", "success");
        } catch (NotEnoughProductsInStockException e) {
            response.put("status", "failed");
            response.put("message", e.getMessage());
        }
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());
        return new ApiResponse<>(1000, "Checkout completed", response);
    }

    // API to add product to cart with quantity
    @PostMapping("/shoppingCart/addProduct")
    public ApiResponse<Map<String, Object>> addToCart(@RequestParam("flowerID") int flowerID,
                                                      @RequestParam("quantity") int quantity) {
        cartShopService.addToCart(flowerID, quantity);

        Map<String, Object> response = new HashMap<>();
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());

        return new ApiResponse<>(1000, "Product added to cart with quantity", response);
    }

    // API to clear the entire cart
    @PostMapping("/shoppingCart/clearCart")
    public ApiResponse<Map<String, Object>> clearCart() {
        cartShopService.clearCart();
        return getShoppingCart();
    }
}
