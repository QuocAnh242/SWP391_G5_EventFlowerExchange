package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFlowerBatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FlowerBatchSerivice implements IFlowerBatchService{
    @Autowired
    private IFlowerBatchRepository flowerBatchRepository;
    @Override
    public List<FlowerBatch> getAllFlowerBatch() {
        return flowerBatchRepository.findAll();
    }

    @Override
    public FlowerBatch insertFlowerBatch(FlowerBatch flowerBatch) {
        return flowerBatchRepository.save(flowerBatch);
    }

    @Override
    public FlowerBatch updateFlowerBatch(int flowerID, FlowerBatch flowerBatch) {
        FlowerBatch fb=flowerBatchRepository.getById(flowerID);
        if(fb != null){
            fb.setFlowerName(flowerBatch.getFlowerName());
            fb.setQuantity(flowerBatch.getQuantity());
            fb.setStatus(flowerBatch.getStatus());
            fb.setDescription(flowerBatch.getDescription());
            fb.setPrice(flowerBatch.getPrice());
            fb.setImageUrl(flowerBatch.getImageUrl());
            fb.setCategory(flowerBatch.getCategory());
            fb.setEventFlowerPosting(flowerBatch.getEventFlowerPosting());
        }
        return null;
    }

    @Override
    public void deleteFlowerBatch(int flowerID) {
            flowerBatchRepository.deleteById(flowerID);
    }

    @Override
    public Optional<FlowerBatch> getFlowerBatchById(int flowerID) {
        return flowerBatchRepository.findById(flowerID);
    }
}
