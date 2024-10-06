package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Delivery;

import java.util.List;
import java.util.Optional;

public interface IDeliveryService {
    //    public List<FlowerBatch> getAllFlowerBatch();
//    public FlowerBatch insertFlowerBatch(FlowerBatch flowerBatch);
//    public FlowerBatch updateFlowerBatch(int flowerID, FlowerBatch flowerBatch);
//    public void deleteFlowerBatch(int flowerID);
//    public Optional<FlowerBatch> getFlowerBatchById(int flowerID);
    public List<Delivery> getAllDeliveries();
    public Delivery insertDelivery(Delivery delivery);
    public Delivery updateDelivery(int deliveryID,Delivery delivery);
    public void deleteDelivery(int deliveryID);
    public Optional<Delivery> getDeliveryById(int deliveryID);
}
