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
import java.util.List;
import java.util.Optional;
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

    // Upload image for FlowerBatch
    public String uploadImageForFlowerBatch(MultipartFile file, int batchID) throws IOException {
        // Tìm batch theo ID
        FlowerBatch flowerBatch = flowerBatchRepository.findById(batchID)
                .orElseThrow(() -> new FileNotFoundException("Batch with ID " + batchID + " not found"));

        // Lưu hình ảnh liên quan đến batch
        FlowerImage imageData = flowerImageRepository.save(
                FlowerImage.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .imageData(ImageUtils.compressImage(file.getBytes()))
                        .flowerBatch(flowerBatch) // Liên kết hình ảnh với batch
                        .build()
        );

        if (imageData != null) {
            return "File ảnh upload thành công cho batch: " + file.getOriginalFilename();
        }
        return null;
    }

    // Download image by batchID
    public byte[] downloadImageByBatchID(int batchID) throws IOException {
        // Tìm batch theo ID
        FlowerBatch flowerBatch = flowerBatchRepository.findById(batchID)
                .orElseThrow(() -> new RuntimeException("Batch with ID " + batchID + " not found"));

        // Lấy hình ảnh liên quan đến batch
        Optional<FlowerImage> image = flowerImageRepository.findByFlowerBatch(flowerBatch).stream().findFirst();

        // Nếu không có hình ảnh nào được tìm thấy, ném ngoại lệ
        return image.map(img -> ImageUtils.decompressImage(img.getImageData()))
                .orElseThrow(() -> new RuntimeException("No images found for batch ID: " + batchID));
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
