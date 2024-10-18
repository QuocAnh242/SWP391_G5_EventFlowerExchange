package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    // Tạo đơn hàng
    @PostMapping("/")
    public ApiResponse<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.insertOrder(order);
        return ApiResponse.<Order>builder()
                .code(1000)
                .message("Order created successfully")
                .result(createdOrder)
                .build();
    }

    // Lấy tất cả đơn hàng
    @GetMapping("/")
    public ApiResponse<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ApiResponse.<List<Order>>builder()
                .code(1000)
                .message("Orders retrieved successfully")
                .result(orders)
                .build();
    }

    // Lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ApiResponse<Order> getOrderById(@PathVariable int id) {
        Order order = orderService.getOrderById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return ApiResponse.<Order>builder()
                .code(1000)
                .message("Order retrieved successfully")
                .result(order)
                .build();
    }

    // Cập nhật đơn hàng
    @PutMapping("/{id}")
    public ApiResponse<Order> updateOrder(@PathVariable int id, @RequestBody Order order) {
        Order updatedOrder = orderService.updateOrder(id, order);
        return ApiResponse.<Order>builder()
                .code(1000)
                .message("Order updated successfully")
                .result(updatedOrder)
                .build();
    }

    // Xóa đơn hàng
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
        return ApiResponse.<String>builder()
                .code(1000)
                .message("Order deleted successfully")
                .result("Order deleted successfully!")
                .build();
    }
}
