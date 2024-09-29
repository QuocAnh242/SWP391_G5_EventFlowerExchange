package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FlowerBatchSerivice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/flower")
public class FlowerBatchController {
    @Autowired
    private FlowerBatchSerivice flowerBatchSerivice;
    @GetMapping("/")
    public ResponseEntity<List<FlowerBatch>> fetchAll() {

        return ResponseEntity.ok(flowerBatchSerivice.getAllFlowerBatch()) ;
    }
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public FlowerBatch saveFlower(@RequestBody FlowerBatch orchid) {
        return flowerBatchSerivice.insertFlowerBatch(orchid);//201 CREATED
    }
    @PutMapping("/{id}")
    public ResponseEntity<FlowerBatch> updateFlowerId(@PathVariable int flowerId, @RequestBody FlowerBatch fb) {
        FlowerBatch updatedFlowerId = flowerBatchSerivice.updateFlowerBatch(flowerId, fb);
        return ResponseEntity.ok(updatedFlowerId);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFlower(@PathVariable int id) {
        flowerBatchSerivice.deleteFlowerBatch(id);
        return ResponseEntity.ok("Deleted!");
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<FlowerBatch>> getFbyId(@PathVariable int id) {
        Optional<FlowerBatch> fb= flowerBatchSerivice.getFlowerBatchById(id);
        return ResponseEntity.ok(fb);
    }

}
