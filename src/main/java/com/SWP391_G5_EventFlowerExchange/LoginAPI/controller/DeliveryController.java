package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Category;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Delivery;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Delivery>> fetchAll(){
        return ResponseEntity.ok(deliveryService.getAllDeliveries());
    }
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Delivery saveDeli(@RequestBody Delivery delivery) {
        return deliveryService.insertDelivery(delivery);//201 CREATED
    }
    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDeliId(@PathVariable int id, @RequestBody Delivery delivery) {
        Delivery updateDeli = deliveryService.updateDelivery(id, delivery);
        return ResponseEntity.ok(updateDeli);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDeli(@PathVariable int id) {
        deliveryService.deleteDelivery(id);
        return ResponseEntity.ok("Deleted!");
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Delivery>> getDeliById(@PathVariable int id) {
        Optional<Delivery> deli= deliveryService.getDeliveryById(id);
        return ResponseEntity.ok(deli);
    }
}
