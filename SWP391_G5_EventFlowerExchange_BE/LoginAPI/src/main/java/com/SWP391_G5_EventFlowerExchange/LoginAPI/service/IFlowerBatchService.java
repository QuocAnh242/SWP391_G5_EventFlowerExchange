package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;

import java.util.List;
import java.util.Optional;

public interface IFlowerBatchService {
    public List<FlowerBatch> getAllFlowerBatch();
    public FlowerBatch insertFlowerBatch(FlowerBatch flowerBatch);
    public FlowerBatch updateFlowerBatch(int flowerID, FlowerBatch flowerBatch);
    public void deleteFlowerBatch(int flowerID);
    public Optional<FlowerBatch> getFlowerBatchById(int flowerID);


}
