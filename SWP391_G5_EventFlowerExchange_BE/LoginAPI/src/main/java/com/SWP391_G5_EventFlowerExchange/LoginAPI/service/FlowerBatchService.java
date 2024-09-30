package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFlowerBatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FlowerBatchService implements IFlowerBatchService{
    @Autowired
    private IFlowerBatchRepository flowerBatchRepository;
    @Override
    public List<com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch> getAllFlowerBatch() {
        return flowerBatchRepository.findAll();
    }

    @Override
    public com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch insertFlowerBatch(com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch flowerBatch) {
        return flowerBatchRepository.save(flowerBatch);
    }

    @Override
    public com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch updateFlowerBatch(int flowerID, com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch flowerBatch) {
        com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch fb=flowerBatchRepository.getById(flowerID);
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
    public Optional<com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch> getFlowerBatchById(int flowerID) {
        return flowerBatchRepository.findById(flowerID);
    }
}
