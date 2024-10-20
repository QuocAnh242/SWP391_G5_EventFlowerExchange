package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Category;

import java.util.List;
import java.util.Optional;

public interface ICatetoryService {

    public List<Category> getAllCategories();
    public Category insertCategory(Category category);
    public Category updateCategory(int catetoryId,Category category);
    public void deleteCategory(int catetoryId);
    public Optional<Category> getCategoryById(int catetoryId);
}
