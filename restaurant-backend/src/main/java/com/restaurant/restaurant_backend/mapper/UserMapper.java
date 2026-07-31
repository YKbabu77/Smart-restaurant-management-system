package com.restaurant.restaurant_backend.mapper;

import com.restaurant.restaurant_backend.dto.UserDTO;
import com.restaurant.restaurant_backend.entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {

        if (user == null) {
            return null;
        }

        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name(),
                user.getDateOfBirth(),
                user.getIsActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

}