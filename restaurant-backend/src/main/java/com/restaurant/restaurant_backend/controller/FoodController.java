package com.restaurant.restaurant_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.restaurant_backend.dto.FoodDTO;
import com.restaurant.restaurant_backend.entity.Food;
import com.restaurant.restaurant_backend.service.FoodService;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    @Autowired
    private FoodService foodService;

    // Create Food
    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        return ResponseEntity.ok(foodService.saveFood(food));
    }

    // Get All Foods
    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods() {
        return ResponseEntity.ok(foodService.getAllFoods());
    }

    // Get Food By ID
    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {

        return foodService.getFoodById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get Foods By Category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<FoodDTO>> getFoodsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(foodService.getFoodsByCategory(categoryId));
    }

    // Get Available Foods
    @GetMapping("/available")
    public ResponseEntity<List<FoodDTO>> getAvailableFoods() {
        return ResponseEntity.ok(foodService.getAvailableFoods());
    }

    // Update Food
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id,
                                           @RequestBody Food food) {

        return ResponseEntity.ok(foodService.updateFood(id, food));
    }

    // Delete Food
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFood(@PathVariable Long id) {

        foodService.deleteFood(id);

        return ResponseEntity.ok("Food deleted successfully.");
    }
}