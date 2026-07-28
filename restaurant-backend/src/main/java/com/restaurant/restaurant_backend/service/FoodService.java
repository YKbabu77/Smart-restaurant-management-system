package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.dto.FoodDTO;
import com.restaurant.restaurant_backend.entity.Food;

public interface FoodService {

    Food saveFood(Food food);

    List<FoodDTO> getAllFoods();

    Optional<FoodDTO> getFoodById(Long id);

    List<FoodDTO> getFoodsByCategory(Long categoryId);

    List<FoodDTO> getAvailableFoods();

    Food updateFood(Long id, Food food);

    void deleteFood(Long id);
}
