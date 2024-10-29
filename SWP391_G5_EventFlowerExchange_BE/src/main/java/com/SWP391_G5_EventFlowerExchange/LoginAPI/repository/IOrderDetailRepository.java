package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;


import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetail;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.OrderDetailKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailKey> {
    List<OrderDetail> findByOrder_OrderID(int orderID);
    List<OrderDetail> findByFlowerBatchIn(List<FlowerBatch> flowerBatches);

}
