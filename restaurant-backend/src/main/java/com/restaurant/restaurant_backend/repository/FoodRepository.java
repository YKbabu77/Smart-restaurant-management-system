package com.restaurant.restaurant_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.restaurant_backend.dto.FoodDTO;
import com.restaurant.restaurant_backend.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    List<FoodDTO> findByCategoryId(Long categoryId);

    List<FoodDTO> findByIsAvailableTrue();

}
