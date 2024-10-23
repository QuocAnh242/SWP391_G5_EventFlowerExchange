package com.SWP391_G5_EventFlowerExchange.LoginAPI.controller;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Category;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.service.CatetoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/catetory")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CatetoryController {
    CatetoryService catetoryService;

    @GetMapping("/")
    public ResponseEntity<List<Category>> fetchAll(){
        return ResponseEntity.ok(catetoryService.getAllCategories());
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Category saveCate(@RequestBody Category cateId) {

        return catetoryService.insertCategory(cateId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCateId(@PathVariable int id, @RequestBody Category cate) {
        Category updateCateId = catetoryService.updateCategory(id, cate);
        return ResponseEntity.ok(updateCateId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCate(@PathVariable int id) {
        catetoryService.deleteCategory(id);
        return ResponseEntity.ok("Deleted!");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getCateById(@PathVariable int id) {
        Optional<Category> cate= catetoryService.getCategoryById(id);
        return ResponseEntity.ok(cate);
    }

}
