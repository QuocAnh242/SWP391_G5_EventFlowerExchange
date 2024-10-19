package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Category;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.ICatetoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CatetoryService implements ICatetoryService{
    @Autowired
    private ICatetoryRepository icatetoryRepository;
    @Override
    public List<Category> getAllCategories() {
        return icatetoryRepository.findAll();
    }

    @Override
    public Category insertCategory(Category category) {
        return icatetoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int catetoryId, Category category) {
        Category cate = icatetoryRepository.getById(catetoryId);
        if(cate != null){

            if (category.getFlowerType() != null) {
                cate.setFlowerType(category.getFlowerType());
            }
            if (category.getDescription() != null) {
                cate.setDescription(category.getDescription());
            }
            if (category.getImageUrl() != null) {
                cate.setImageUrl(category.getImageUrl());
            }
            icatetoryRepository.save(cate);

        }

        return null;
    }

    @Override
    public void deleteCategory(int catetoryId) {
        icatetoryRepository.deleteById(catetoryId);
    }

    @Override
    public Optional<Category> getCategoryById(int catetoryId) {
        return icatetoryRepository.findById(catetoryId);
    }
}
