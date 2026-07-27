package service.impl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Food;
import repository.FoodRepository;
import service.FoodService;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    @Override
    public Optional<Food> getFoodById(Long id) {
        return foodRepository.findById(id);
    }

    @Override
    public List<Food> getFoodsByCategory(Long categoryId) {
        return foodRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Food> getAvailableFoods() {
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
