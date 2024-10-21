package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.NotEnoughProductsInStockException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.CartShopService;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FlowerBatchSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    /**
     * API to get current shopping cart details
     * @return Map containing products in cart and total price
     */
    @GetMapping("/shoppingCart")
    public Map<String, Object> getShoppingCart() {
        Map<String, Object> response = new HashMap<>();
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());
        return response;
    }

    /**
     * API to add product to shopping cart
     * @param flowerID ID of the flower batch to add
     * @return Updated shopping cart
     */

    @GetMapping("/shoppingCart/addProduct/{flowerID}")
    public ResponseEntity<Map<String, Object>> addProductToCart(@PathVariable("flowerID") int flowerID) {
        flowerBatchSerivice.getFlowerBatchById(flowerID).ifPresent(cartShopService::addPost);

        Map<String, Object> response = new HashMap<>();
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());

        return ResponseEntity.ok(response);
    }

    /**
     * API to remove product from shopping cart
     * @param flowerID ID of the flower batch to remove
     * @return Updated shopping cart
     */
    @GetMapping("/shoppingCart/removeProduct/{flowerID}")
    public Map<String, Object> removeProductFromCart(@PathVariable("flowerID") int flowerID) {
        flowerBatchSerivice.getFlowerBatchById(flowerID).ifPresent(cartShopService::removeFlowerBatch);
        return getShoppingCart();
    }

    /**
     * API to checkout the shopping cart
     * @return Response containing success or failure message and updated cart
     */
    @GetMapping("/shoppingCart/checkout")
    public Map<String, Object> checkout() {
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
        return response;
    }
    @PostMapping("/shoppingCart/addProduct")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestParam("flowerID") int flowerID,
                                                         @RequestParam("quantity") int quantity) {
        cartShopService.addToCart(flowerID, quantity);

        Map<String, Object> response = new HashMap<>();
        response.put("products", cartShopService.getFlowerBatchInCart());
        response.put("total", cartShopService.getTotal().toString());

        return ResponseEntity.ok(response);
    }
    // xóa toàn bộ Cart
    @PostMapping("/shoppingCart/clearCart")
    public Map<String, Object> clearCart() {
        cartShopService.clearCart();
        return getShoppingCart();
    }
}
