package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Delivery;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IDeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DeliveryService implements IDeliveryService{
    @Autowired
    private IDeliveryRepository deliveryRepository;
    @Override
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    public Delivery insertDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery updateDelivery(int deliveryID, Delivery delivery) {
        Delivery deli =deliveryRepository.findById(deliveryID)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        if(deli !=null){
            if (deli.getDeliveryDate()!=null){
                deli.setDeliveryDate(delivery.getDeliveryDate());
            }
            if (deli.getAvailableStatus()!=null){
                deli.setAvailableStatus(deli.getAvailableStatus());
            }
            if(deli.getRating()!=0){
                deli.setRating(deli.getRating());
            }
            if(deli.getOrders()!=null){
                deli.setOrders(deli.getOrders());
            }

        }
        return deliveryRepository.save(deli);
    }

    @Override
    public void deleteDelivery(int deliveryID) {
            deliveryRepository.deleteById(deliveryID);
    }

    @Override
    public Optional<Delivery> getDeliveryById(int deliveryID) {
        return deliveryRepository.findById(deliveryID);
    }
}
