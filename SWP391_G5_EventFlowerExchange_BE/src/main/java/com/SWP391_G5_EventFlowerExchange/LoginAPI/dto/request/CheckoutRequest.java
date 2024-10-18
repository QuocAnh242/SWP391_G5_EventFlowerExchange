package com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetail;
import lombok.Data;

import java.util.List;

@Data
public class CheckoutRequest {
    private Order order;
    private List<OrderDetail> orderDetails;
}
