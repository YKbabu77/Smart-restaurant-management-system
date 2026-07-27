package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.entity.Food;

public interface FoodService {

    Food saveFood(Food food);

    List<Food> getAllFoods();

    Optional<Food> getFoodById(Long id);

    List<Food> getFoodsByCategory(Long categoryId);

    List<Food> getAvailableFoods();

    Food updateFood(Long id, Food food);

    void deleteFood(Long id);
}
