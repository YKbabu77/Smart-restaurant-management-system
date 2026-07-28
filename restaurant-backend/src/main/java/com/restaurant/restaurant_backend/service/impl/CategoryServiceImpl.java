package com.restaurant.restaurant_backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.CategoryDTO;
import com.restaurant.restaurant_backend.entity.Category;
import com.restaurant.restaurant_backend.exception.ResourceNotFoundException;
import com.restaurant.restaurant_backend.mapper.CategoryMapper;
import com.restaurant.restaurant_backend.repository.CategoryRepository;
import com.restaurant.restaurant_backend.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
            .stream()
            .map(CategoryMapper::toDTO)
            .toList();
    }

    @Override
    public Optional<CategoryDTO> getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            return Optional.of(CategoryMapper.toDTO(category));
    }

    @Override
    public Category updateCategory(Long id, Category category) {

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setImageUrl(category.getImageUrl());
        existingCategory.setStatus(category.getStatus());

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
