package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Delivery;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/")
    public ApiResponse<List<Delivery>> fetchAll() {
        List<Delivery> deliveries = deliveryService.getAllDeliveries();
        return new ApiResponse<>(1000, "Deliveries retrieved successfully", deliveries);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Delivery> saveDeli(@RequestBody Delivery delivery) {
        Delivery savedDelivery = deliveryService.insertDelivery(delivery);
        return new ApiResponse<>(1000, "Delivery created successfully", savedDelivery);
    }

    @PutMapping("/{id}")
    public ApiResponse<Delivery> updateDeliId(@PathVariable int id, @RequestBody Delivery delivery) {
        Delivery updatedDeli = deliveryService.updateDelivery(id, delivery);
        return new ApiResponse<>(1000, "Delivery updated successfully", updatedDeli);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteDeli(@PathVariable int id) {
        deliveryService.deleteDelivery(id);
        return new ApiResponse<>(1000, "Delivery deleted successfully", "Deleted!");
    }

    @GetMapping("/{id}")
    public ApiResponse<Optional<Delivery>> getDeliById(@PathVariable int id) {
        Optional<Delivery> delivery = deliveryService.getDeliveryById(id);
        return new ApiResponse<>(1000, "Delivery retrieved successfully", delivery);
    }
}
