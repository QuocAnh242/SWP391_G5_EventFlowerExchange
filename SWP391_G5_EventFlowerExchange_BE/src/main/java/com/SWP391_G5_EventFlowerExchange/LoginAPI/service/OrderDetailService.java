package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.*;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IOrderDetailRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailService implements IOrderDetailService {

    IOrderDetailRepository orderDetailRepository;

    @Override
    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail getOrderDetail(OrderDetailKey id) {
        return orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
    }

    @Override
    public OrderDetail updateOrderDetail(OrderDetailKey id, OrderDetail orderDetail) {
        OrderDetail existingOrderDetail = getOrderDetail(id);
        existingOrderDetail.setQuantity(orderDetail.getQuantity());
        existingOrderDetail.setPrice(orderDetail.getPrice());
        existingOrderDetail.setFlowerBatch(orderDetail.getFlowerBatch());
        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    public void deleteOrderDetail(OrderDetailKey id) {
        orderDetailRepository.deleteById(id);
    }

    // New method implementation
    @Override
    public List<OrderDetail> getOrderDetailsByOrderID(int orderID) {
        return orderDetailRepository.findByOrder_OrderID(orderID);
    }

    @Override
    public User getSellerByOrderID(int orderID) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_OrderID(orderID);
        if (!orderDetails.isEmpty()) {
            FlowerBatch flowerBatch = orderDetails.get(0).getFlowerBatch();
            EventFlowerPosting posting = flowerBatch.getEventFlowerPosting();
            return posting.getUser(); // Returns the seller (User) who created the post
        }
        throw new RuntimeException("No order details found for order ID: " + orderID);
    }
}
