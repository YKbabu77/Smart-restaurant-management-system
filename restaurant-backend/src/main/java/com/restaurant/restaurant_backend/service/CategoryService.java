package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.entity.Category;

public interface CategoryService {

    Category saveCategory(Category category);

    List<Category> getAllCategories();

    Optional<Category> getCategoryById(Long id);

    Category updateCategory(Long id, Category category);

    void deleteCategory(Long id);

}
