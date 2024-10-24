package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.configuration.VNPayConfig;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.MonthlyRevenueResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.OrderCreationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.*;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {

    IOrderRepository iOrderRepository;
    IOrderDetailRepository iOrderDetailRepository;
    IDeliveryService iDeliveryService;
    IUserRepository userRepository;

    @Override
    public Order createOrder(OrderCreationRequest request) {
        Order order = new Order();

        // Create the Delivery in the backend
        Delivery newDelivery = new Delivery();
        newDelivery.setDeliveryDate(request.getDelivery().getDeliveryDate());
        newDelivery.setRating(request.getDelivery().getRating());
        newDelivery.setAvailableStatus(request.getDelivery().getAvailableStatus());
        Delivery savedDelivery = iDeliveryService.addDelivery(newDelivery);

        // Associate the created delivery with the order
        order.setDelivery(savedDelivery);

        // Set common fields for the order
        order.setOrderDate(request.getOrderDate());
        order.setTotalPrice(request.getTotalPrice());
        order.setShippingAddress(request.getShippingAddress());
        order.setUser(request.getUser());
        order.setPayment(request.getPayment());

        // Set status based on payment method
        switch (request.getPayment().getPaymentID()) {
            case 1:
                order.setStatus("Checkout VNPay Successfully!");
                break;
            case 2:
                order.setStatus("Checkout MOMO Successfully!");
                break;
            case 3:
            default:
                order.setStatus("Create Order Successfully!");
                break;
        }

        // Step 5: Save and return the order
        return iOrderRepository.save(order);
    }

    @Override
    public Order insertOrder(Order order) {
        // Save order to the database
        return iOrderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return iOrderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(int orderId) {
        return iOrderRepository.findById(orderId);
    }

    @Override
    public Order updateOrder(int orderId, Order order) {
        Order existingOrder = iOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Update non-null fields
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

        return iOrderRepository.save(existingOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(int orderId) {
        iOrderRepository.deleteById(orderId);
    }

    @Transactional
    public Order saveOrder(Order order, List<OrderDetail> orderDetails) {
        // Save Order
        Order savedOrder = iOrderRepository.save(order);

        // Save OrderDetails associated with the saved Order
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrder(savedOrder); // Establish relationship with saved Order
            iOrderDetailRepository.save(orderDetail);
        }

        return savedOrder;
    }

    // Create VNPay payment URL
    public String createVNPayUrl(Order order) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        double totalAmount = order.getTotalPrice() * 100; // Convert to VND
        String amount = String.valueOf(Math.round(totalAmount));

        // Create VNPay parameters
        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", String.valueOf(order.getOrderID()));
        vnp_Params.put("vnp_OrderInfo", "Order information: " + order.getOrderID());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Amount", amount);
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_CreateDate", formattedCreateDate);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");

        // Create signing data string
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

        // Build the final payment URL
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

    // HMAC SHA512 function
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

    @Transactional
    public void cancelPayment(int orderId) {
        Order order = iOrderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Update order status to canceled
        order.setStatus("Canceled");
        order.setUpdatedAt(LocalDateTime.now());

        iOrderRepository.save(order);
    }

    public void updateOrderStatus(int orderId, String status) {
        Order order = iOrderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found!"));
        order.setStatus(status); // Update status
        order.setUpdatedAt(LocalDateTime.now()); // Update timestamp
        iOrderRepository.save(order); // Save changes
    }

    @Override
    // Tính tổng doanh thu từ các đơn hàng đã hoàn thành
    public List<MonthlyRevenueResponse> calculateMonthlyRevenue(){
        // Lấy danh sách các đơn hàng đã hoàn thành
        List<Order> completedOrders= iOrderRepository.findByStatus("Đã Nhận Hàng");
        // Tạo một bản đồ để lưu trữ doanh thu theo từng tháng
        Map<String,Double> monthlyRevenueMap=new HashMap<>();
        // Định dạng tháng
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
        // Tính doanh thu theo tháng
        for (Order order : completedOrders) {
            String month = order.getOrderDate().format(monthFormatter);
            monthlyRevenueMap.merge(month, order.getTotalPrice(), Double::sum);
        }
        // Chuyển đổithành danh sách MonthlyRevenueResponse
        return monthlyRevenueMap.entrySet().stream()
                .map(entry -> new MonthlyRevenueResponse(entry.getKey(), entry.getValue()))
                .sorted(Comparator.comparing(MonthlyRevenueResponse::getMonth)) // Sắp xếp theo tháng
                .collect(Collectors.toList());
    }
    public List<Order> getOrdersByUserID(int userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userID));
        return iOrderRepository.findByUser(user);
    }

}
