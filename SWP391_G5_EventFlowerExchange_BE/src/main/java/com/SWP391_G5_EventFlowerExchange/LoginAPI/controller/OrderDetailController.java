package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetail;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetailKey;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
@CrossOrigin("http://localhost:3000")
public class OrderDetailController {

    @Autowired
    private IOrderDetailService orderDetailService;

    // Tạo mới OrderDetail
    @PostMapping("/")
    public ApiResponse<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail) {
        OrderDetail createdOrderDetail = orderDetailService.createOrderDetail(orderDetail);
        return new ApiResponse<>(1000, "OrderDetail created successfully", createdOrderDetail);
    }

    // Lấy tất cả OrderDetails
    @GetMapping("/")
    public ApiResponse<List<OrderDetail>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailService.getAllOrderDetails();
        return new ApiResponse<>(1000, "OrderDetails retrieved successfully", orderDetails);
    }

    // Lấy OrderDetail theo ID
    @GetMapping("/{id}")
    public ApiResponse<OrderDetail> getOrderDetail(@PathVariable OrderDetailKey id) {
        OrderDetail orderDetail = orderDetailService.getOrderDetail(id);
        return new ApiResponse<>(1000, "OrderDetail retrieved successfully", orderDetail);
    }

    // Cập nhật OrderDetail
    @PutMapping("/{id}")
    public ApiResponse<OrderDetail> updateOrderDetail(@PathVariable OrderDetailKey id, @RequestBody OrderDetail orderDetail) {
        OrderDetail updatedOrderDetail = orderDetailService.updateOrderDetail(id, orderDetail);
        return new ApiResponse<>(1000, "OrderDetail updated successfully", updatedOrderDetail);
    }

    // Xóa OrderDetail
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteOrderDetail(@PathVariable OrderDetailKey id) {
        orderDetailService.deleteOrderDetail(id);
        return new ApiResponse<>(1000, "OrderDetail deleted successfully", "Deleted!");
    }
}
