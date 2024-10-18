package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.ApiResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Category;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.CatetoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/category")
public class CatetoryController {

    @Autowired
    private CatetoryService catetoryService;

    @GetMapping("/")
    public ApiResponse<List<Category>> fetchAll() {
        List<Category> categories = catetoryService.getAllCategories();
        return new ApiResponse<>(1000, "Categories retrieved successfully", categories);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Category> saveCate(@RequestBody Category cateId) {
        Category savedCategory = catetoryService.insertCategory(cateId);
        return new ApiResponse<>(1000, "Category created successfully", savedCategory);
    }

    @PutMapping("/{id}")
    public ApiResponse<Category> updateCateId(@PathVariable int id, @RequestBody Category cate) {
        Category updatedCate = catetoryService.updateCategory(id, cate);
        return new ApiResponse<>(1000, "Category updated successfully", updatedCate);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCate(@PathVariable int id) {
        catetoryService.deleteCategory(id);
        return new ApiResponse<>(1000, "Category deleted successfully", "Deleted!");
    }

    @GetMapping("/{id}")
    public ApiResponse<Optional<Category>> getCateById(@PathVariable int id) {
        Optional<Category> category = catetoryService.getCategoryById(id);
        return new ApiResponse<>(1000, "Category retrieved successfully", category);
    }

}
