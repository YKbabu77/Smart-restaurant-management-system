package com.restaurant.restaurant_backend.service.impl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.FoodDTO;
import com.restaurant.restaurant_backend.entity.Food;
import com.restaurant.restaurant_backend.exception.ResourceNotFoundException;
import com.restaurant.restaurant_backend.mapper.FoodMapper;
import com.restaurant.restaurant_backend.repository.FoodRepository;
import com.restaurant.restaurant_backend.service.FoodService;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }

    @Override
    public List<FoodDTO> getAllFoods() {
        return foodRepository.findAll()
            .stream()
            .map(FoodMapper::toDTO)
            .toList();
    }

    @Override
    public Optional<FoodDTO> getFoodById(Long id) {
        Food food = foodRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Food not found"));
        return Optional.of(FoodMapper.toDTO(food));
    }

    @Override
    public List<FoodDTO> getFoodsByCategory(Long categoryId) {
        return foodRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<FoodDTO> getAvailableFoods() {
        return foodRepository.findByIsAvailableTrue();
    }

    @Override
    public Food updateFood(Long id, Food food) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        existingFood.setName(food.getName());
        existingFood.setDescription(food.getDescription());
        existingFood.setPrice(food.getPrice());
        existingFood.setImageUrl(food.getImageUrl());
        existingFood.setIsAvailable(food.getIsAvailable());
        existingFood.setIsSpecial(food.getIsSpecial());
        existingFood.setRating(food.getRating());
        existingFood.setCategory(food.getCategory());

        return foodRepository.save(existingFood);
    }

    @Override
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}
