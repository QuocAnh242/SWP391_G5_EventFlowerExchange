package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.Utils.ImageUtils;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerImage;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFlowerBatchRepository;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IFlowerImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FlowerImageService {

    private final IFlowerImageRepository flowerImageRepository;
    private final IFlowerBatchRepository flowerBatchRepository;

    @Autowired
    public FlowerImageService(IFlowerImageRepository flowerImageRepository, IFlowerBatchRepository flowerBatchRepository) {
        this.flowerImageRepository = flowerImageRepository;
        this.flowerBatchRepository = flowerBatchRepository;
    }

    // Phương thức upload nhiều hình ảnh
    public void uploadImages(int batchID, List<MultipartFile> files) throws IOException {
        // Tìm FlowerBatch theo ID
        FlowerBatch flowerBatch = flowerBatchRepository.findById(batchID)
                .orElseThrow(() -> new RuntimeException("Batch with ID " + batchID + " not found"));

        for (MultipartFile file : files) {
            // Tạo đối tượng FlowerImage cho từng hình ảnh
            FlowerImage flowerImage = FlowerImage.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(ImageUtils.compressImage(file.getBytes())) // Nén dữ liệu hình ảnh
                    .flowerBatch(flowerBatch) // Gán FlowerBatch
                    .build();

            // Lưu hình ảnh vào cơ sở dữ liệu
            flowerImageRepository.save(flowerImage);
        }
    }

    // Phương thức download hình ảnh
    public List<String> downloadImagesByBatchID(int batchID) throws IOException {
        FlowerBatch flowerBatch = flowerBatchRepository.findById(batchID)
                .orElseThrow(() -> new RuntimeException("Batch with ID " + batchID + " not found"));

        List<FlowerImage> images = flowerImageRepository.findByFlowerBatch(flowerBatch);
        if (images.isEmpty()) {
            return Collections.emptyList();
        }
        return images.stream()
                .map(img -> {
                    byte[] decompressedImage = ImageUtils.decompressImage(img.getImageData());
                    return Base64.getEncoder().encodeToString(decompressedImage); // Chuyển đổi thành base64
                })
                .toList();
    }
    // Hàm cập nhật ảnh
    public String updateImage(MultipartFile file, int batchID) throws IOException {
        FlowerBatch flowerBatch = flowerBatchRepository.findById(batchID)
                .orElseThrow(() -> new FileNotFoundException("Batch with ID " + batchID + " not found"));

        Optional<FlowerImage> existingImage = flowerImageRepository.findByFlowerBatch(flowerBatch).stream().findFirst();

        if (existingImage.isPresent()) {
            FlowerImage flowerImage = existingImage.get();
            flowerImage.setName(file.getOriginalFilename());
            flowerImage.setType(file.getContentType());
            flowerImage.setImageData(ImageUtils.compressImage(file.getBytes()));

            flowerImageRepository.save(flowerImage);

            return "Image updated successfully for batchID: " + batchID;
        } else {
            throw new RuntimeException("Image not found for batchID: " + batchID);
        }
    }

    // Hàm xóa ảnh
    public String deleteImage(int batchID) {
        FlowerBatch flowerBatch = flowerBatchRepository.findById(batchID)
                .orElseThrow(() -> new RuntimeException("Batch with ID " + batchID + " not found"));

        Optional<FlowerImage> flowerImage = flowerImageRepository.findByFlowerBatch(flowerBatch).stream().findFirst();

        if (flowerImage.isPresent()) {
            flowerImageRepository.deleteById(Long.valueOf(flowerImage.get().getId()));
            return "Image deleted successfully for batchID: " + batchID;
        } else {
            throw new RuntimeException("Image not found for batchID: " + batchID);
        }
    }

    // Hàm lấy tất cả ảnh
    public List<byte[]> getAllImages() {
        List<FlowerImage> images = flowerImageRepository.findAll();
        return images.stream()
                .map(image -> ImageUtils.decompressImage(image.getImageData()))
                .collect(Collectors.toList());
    }
}
