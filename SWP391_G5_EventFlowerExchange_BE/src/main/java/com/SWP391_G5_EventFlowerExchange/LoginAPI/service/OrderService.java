package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.configuration.VNPayConfig;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.*;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.enums.PaymentEnums;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IDeliveryRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IOrderService;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IOrderDetailRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IPaymentRepository;
import com.nimbusds.jose.shaded.gson.JsonObject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private IOrderDetailRepository orderDetailRepository;
    @Autowired
    private IDeliveryRepository deliveryRepository;
    @Autowired
    private IPaymentRepository paymentRepository;
    @Override
    public Order insertOrder(Order order) {

        // Lưu order vào cơ sở dữ liệu
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(int orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public Order updateOrder(int orderId, Order order) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        // Chỉ cập nhật các trường không null
        if (order.getTotalPrice() != 0) {
            existingOrder.setTotalPrice(order.getTotalPrice());
        }

        if (order.getShippingAddress() != null && !order.getShippingAddress().isEmpty()) {
            existingOrder.setShippingAddress(order.getShippingAddress());
        }

        if (order.getStatus() != null && !order.getStatus().isEmpty()) {
            existingOrder.setStatus(order.getStatus());
        }

        existingOrder.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(existingOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }
    @Transactional
    public Order saveOrder(Order order, List<OrderDetail> orderDetails) {
        // Lưu Order
        Order savedOrder = orderRepository.save(order);

        // Lưu OrderDetails với thông tin về Order
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrder(savedOrder); // Thiết lập mối quan hệ với Order đã lưu
            orderDetailRepository.save(orderDetail);
        }

        return savedOrder;
    }

    // Tạo URL thanh toán VNPay
    public String createVNPayUrl(Order order) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        double  totalAmount = order.getTotalPrice() * 100; // Quy đổi thành đồng
        String amount = String.valueOf(Math.round(totalAmount));

        // Tạo các tham số cho VNPay
        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", String.valueOf(order.getOrderID()));
        vnp_Params.put("vnp_OrderInfo", "Thông tin order"+ order.getOrderID());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Amount", amount);
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_CreateDate", formattedCreateDate);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");


        // Tạo chuỗi dữ liệu để ký
        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'

        String signData = signDataBuilder.toString();
        String signed = generateHMAC(VNPayConfig.vnp_HashSecret, signData);

        vnp_Params.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder(VNPayConfig.vnp_Url);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }

    // Hàm HMAC SHA512
    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b : hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }


//    public String createVNPayRefundUrl(Order order, String transactionNo, double refundAmount, String createdBy) throws Exception {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
//        LocalDateTime createDate = LocalDateTime.now();
//        String formattedCreateDate = createDate.format(formatter);
//
//        // Tạo các tham số cho VNPay
//        Map<String, String> vnp_Params = new TreeMap<>();
//        vnp_Params.put("vnp_RequestId", VNPayConfig.getRandomNumber(8));
//        vnp_Params.put("vnp_Version", "2.1.0");
//        vnp_Params.put("vnp_Command", "refund");
//        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
//        vnp_Params.put("vnp_TransactionType", "02"); // Hoàn trả toàn phần
//        vnp_Params.put("vnp_TxnRef", String.valueOf(order.getOrderID())); // Mã giao dịch tại hệ thống của merchant
//        vnp_Params.put("vnp_Amount", String.valueOf((int) (refundAmount * 100))); // Quy đổi thành đồng
//        vnp_Params.put("vnp_OrderInfo", "Hoàn tiền GD OrderId:" + order.getOrderID());
//        vnp_Params.put("vnp_TransactionNo", transactionNo); // Mã giao dịch hoàn trả
//        vnp_Params.put("vnp_TransactionDate")
//        vnp_Params.put("vnp_CreateBy", createdBy);
//        vnp_Params.put("vnp_CreateDate", formattedCreateDate);
//        vnp_Params.put("vnp_IpAddr", "127.0.0.1"); // Địa chỉ IP
//
//        // Tạo chuỗi dữ liệu để ký
//        StringBuilder signDataBuilder = new StringBuilder();
//        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
//            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
//            signDataBuilder.append("=");
//            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
//            signDataBuilder.append("&");
//        }
//        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'
//
//        String signData = signDataBuilder.toString();
//        String signed = generateHMAC(VNPayConfig.vnp_HashSecret, signData);
//
//        vnp_Params.put("vnp_SecureHash", signed);
//
//        // Tạo URL hoàn tiền
//        StringBuilder urlBuilder = new StringBuilder(VNPayConfig.vnp_RefundUrl);
//        urlBuilder.append("?");
//        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
//            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
//            urlBuilder.append("=");
//            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
//            urlBuilder.append("&");
//        }
//        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'
//
//        return urlBuilder.toString();
//    }



    @Transactional
public void cancelPayment(int orderId) {
    Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new EntityNotFoundException("Order not found"));

    // Cập nhật trạng thái đơn hàng
    order.setStatus("Canceled");
    order.setUpdatedAt(LocalDateTime.now());

    orderRepository.save(order);


}
    public void updateOrderStatus(int orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found!"));
        order.setStatus(status); // Cập nhật trạng thái
        order.setUpdatedAt(LocalDateTime.now()); // Cập nhật thời gian
        orderRepository.save(order); // Lưu thay đổi
    }
}
