package com.restaurant.restaurant_backend.mapper;

import com.restaurant.restaurant_backend.dto.CategoryDTO;
import com.restaurant.restaurant_backend.entity.Category;

public class CategoryMapper {

    public static CategoryDTO toDTO(Category category) {

        if (category == null) {
            return null;
        }

        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getImageUrl(),
                category.getStatus(),
                category.getCreatedAt()
        );
    }
}
