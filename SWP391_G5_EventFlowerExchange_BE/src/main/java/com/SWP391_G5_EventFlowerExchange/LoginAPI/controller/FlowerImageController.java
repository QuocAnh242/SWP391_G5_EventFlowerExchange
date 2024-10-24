package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.FlowerImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/flowerImg")
@CrossOrigin("http://localhost:3000")
public class FlowerImageController {

    @Autowired
    private FlowerImageService flowerImageService;

    // API to upload image for FlowerBatch
    @PostMapping("/{batchID}")
    public ResponseEntity<?> uploadImageForFlowerBatch(@RequestParam("image") MultipartFile file,
                                                       @PathVariable("batchID") int batchID) throws IOException {
        String uploadMessage = flowerImageService.uploadImageForFlowerBatch(file, batchID);
        return ResponseEntity.status(HttpStatus.OK).body(uploadMessage);
    }

    // API to download image by FlowerBatch ID
    @GetMapping("/{batchID}")
    public ResponseEntity<?> downloadImageByBatchID(@PathVariable("batchID") int batchID) throws IOException {
        byte[] imageData = flowerImageService.downloadImageByBatchID(batchID);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
    // API cập nhật ảnh cho FlowerBatch
    @PutMapping("/update/{batchID}")
    public ResponseEntity<String> updateImage(@RequestParam("image") MultipartFile file, @PathVariable("batchID") int batchID) throws IOException {
        String message = flowerImageService.updateImage(file, batchID);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    // API xóa ảnh cho FlowerBatch
    @DeleteMapping("/delete/{batchID}")
    public ResponseEntity<String> deleteImage(@PathVariable("batchID") int batchID) {
        String message = flowerImageService.deleteImage(batchID);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    // API lấy tất cả ảnh
    @GetMapping("/all")
    public ResponseEntity<List<byte[]>> getAllImages() {
        List<byte[]> images = flowerImageService.getAllImages();
        return ResponseEntity.status(HttpStatus.OK).body(images);
    }
}
