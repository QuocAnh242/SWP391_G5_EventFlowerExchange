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

    // API upload nhiều hình ảnh cho flower batch
    @PostMapping("/batch/{batchID}/upload")
    public ResponseEntity<String> uploadImages(@PathVariable("batchID") int batchID,
                                               @RequestParam("files") List<MultipartFile> files) {
        try {
            flowerImageService.uploadImages(batchID, files);
            return ResponseEntity.status(HttpStatus.OK).body("Images uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload images: " + e.getMessage());
        }
    }

    // API lấy tất cả hình ảnh theo batchID
    @GetMapping("/batch/{batchID}/images")
    public ResponseEntity<List<String>> downloadImagesByBatchID(@PathVariable("batchID") int batchID) throws IOException {
        List<String> imagesBase64 = flowerImageService.downloadImagesByBatchID(batchID);
        return ResponseEntity.ok(imagesBase64);
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
