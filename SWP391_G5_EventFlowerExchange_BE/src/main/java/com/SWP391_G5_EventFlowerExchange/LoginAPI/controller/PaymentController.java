package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.MomoResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Payment;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.IPaymentService;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.MomoPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@CrossOrigin("http://localhost:3000")
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @Autowired
    private MomoPaymentService momoPaymentService;

    // Tạo mới Payment và tạo Momo payment link
    @PostMapping("/create")
    public ApiResponse<Map<String, Object>> createPayment(@RequestBody Payment payment) {
        // Create a new payment record
        Payment createdPayment = paymentService.createPayment(payment);

        // Generate MoMo payment link
        MomoResponse momoResponse = momoPaymentService.createMomoPayment(
                createdPayment.getAmount(),
                String.valueOf(createdPayment.getPaymentID()),
                "http://localhost:3000/paymentSuccess" // Redirect URL after payment
        );

        Map<String, Object> response = new HashMap<>();
        response.put("payment", createdPayment);
        response.put("payUrl", momoResponse.getPayUrl());

        return new ApiResponse<>(1000, "Payment created and MoMo payment link generated successfully", response);
    }

    // Lấy tất cả Payments
    @GetMapping("/")
    public ApiResponse<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        return new ApiResponse<>(1000, "Payments retrieved successfully", payments);
    }

    // Lấy Payment theo ID
    @GetMapping("/{paymentID}")
    public ApiResponse<Payment> getPayment(@PathVariable int paymentID) {
        Payment payment = paymentService.getPayment(paymentID);
        return new ApiResponse<>(1000, "Payment retrieved successfully", payment);
    }

    // Cập nhật Payment
    @PutMapping("/{paymentID}")
    public ApiResponse<Payment> updatePayment(@PathVariable int paymentID, @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(paymentID, payment);
        return new ApiResponse<>(1000, "Payment updated successfully", updatedPayment);
    }

    // Xóa Payment
    @DeleteMapping("/{paymentID}")
    public ApiResponse<String> deletePayment(@PathVariable int paymentID) {
        paymentService.deletePayment(paymentID);
        return new ApiResponse<>(1000, "Payment deleted successfully", "Deleted!");
    }
}
