package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IOrderService;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order insertOrder(Order order) {
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
        existingOrder.setTotalPrice(order.getTotalPrice());
        existingOrder.setShippingAddress(order.getShippingAddress());
        existingOrder.setStatus(order.getStatus());
        existingOrder.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(existingOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }
}
