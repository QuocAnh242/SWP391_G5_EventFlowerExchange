package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.RefundRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IOrderService;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.OrderRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;

    // Tạo đơn hàng
    @PostMapping("/")
    public ResponseEntity<String> createOrder(@RequestBody Order order) throws Exception {
        // Kiểm tra nếu Order không hợp lệ (nếu cần thiết)
        if (order == null || order.getUser() == null || order.getTotalPrice() <= 0) {
            return ResponseEntity.badRequest().build(); // Trả về mã 400 Bad Request
        }
        // Gọi service để thêm đơn hàng
        Order createdOrder = orderService.insertOrder(order);

        // Chỉ tạo URL thanh toán VNPay nếu paymentID là 1
        String vnPayURL = "";
        if (order.getPayment().getPaymentID() == 1) {
            vnPayURL = orderService.createVNPayUrl(createdOrder);
            System.out.println("VNPay URL: " + vnPayURL);
        }

        // Trả về mã 201 Created cùng với URL thanh toán VNPay nếu đã tạo
        return ResponseEntity.status(201).body(vnPayURL);
    }
    @PostMapping("/payments/success")
    public ResponseEntity<String> paymentSuccess(@RequestParam Map<String, String> params) {
        // Xử lý phản hồi từ VNPay để cập nhật trạng thái
        String responseCode = params.get("vnp_ResponseCode");
        String transactionStatus = params.get("vnp_TransactionStatus");
        String txnRef = params.get("vnp_TxnRef");

        if ("00".equals(responseCode) && "00".equals(transactionStatus)) {
            orderService.updateOrderStatus(Integer.parseInt(txnRef), "Đã thanh toán");
            return ResponseEntity.ok("Payment success. Order status updated.");
        } else if ("24".equals(responseCode) && "02".equals(transactionStatus)) {
            orderService.updateOrderStatus(Integer.parseInt(txnRef), "Đã hủy");
            return ResponseEntity.ok("Payment was canceled. Order status updated.");
        }

        return ResponseEntity.status(400).body("Payment failed or invalid response.");
    }
//    @PutMapping("updateStatus/{id}")
//    public ResponseEntity<Order> updateStatus(@PathVariable int id, @RequestBody Order order) {
//        Order updatedOrder = orderService.updateOrder(id, order);
//        return ResponseEntity.ok(updatedOrder);
//    }

    // Lấy tất cả đơn hàng
    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }


    // Lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable int id) {
        Order order = orderService.getOrderById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return ResponseEntity.ok(order);
    }

    // Cập nhật đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable int id, @RequestBody Order order) {
        Order updatedOrder = orderService.updateOrder(id, order);
        return ResponseEntity.ok(updatedOrder);
    }

    // Xóa đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Order deleted successfully!");
    }
    @DeleteMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelPayment(@PathVariable int orderId) {
        try {
            orderService.cancelPayment(orderId);
            return ResponseEntity.ok("Payment canceled successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Order not found.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while canceling the payment.");
        }
    }
//    @PostMapping("/refund")
//    public ResponseEntity<String> refundOrder(
//            @RequestParam int orderId,
//            @RequestParam String transactionNo,
//            @RequestParam double refundAmount,
//            @RequestParam String createdBy) {
//        try {
//            Optional<Order> optionalOrder = orderRepository.findById(orderId);
//
//            // Kiểm tra xem đơn hàng có tồn tại không
//            if (optionalOrder.isPresent()) {
//                Order order = optionalOrder.get(); // Lấy đối tượng Order từ Optional
//
//                String refundUrl = orderService.createVNPayRefundUrl(order, transactionNo, refundAmount, createdBy);
//                return ResponseEntity.ok(refundUrl);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
//        }}
}

