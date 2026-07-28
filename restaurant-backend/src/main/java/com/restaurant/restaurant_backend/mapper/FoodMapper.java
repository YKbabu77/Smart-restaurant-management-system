package com.restaurant.restaurant_backend.mapper;

import com.restaurant.restaurant_backend.dto.FoodDTO;
import com.restaurant.restaurant_backend.entity.Food;

public class FoodMapper {

    public static FoodDTO toDTO(Food food) {

        if (food == null) {
            return null;
        }

        return new FoodDTO(
                food.getId(),
                food.getCategory().getId(),
                food.getCategory().getName(),
                food.getName(),
                food.getDescription(),
                food.getPrice(),
                food.getImageUrl(),
                food.getIsAvailable(),
                food.getIsSpecial(),
                food.getRating(),
                food.getCreatedAt()
        );
    }
}