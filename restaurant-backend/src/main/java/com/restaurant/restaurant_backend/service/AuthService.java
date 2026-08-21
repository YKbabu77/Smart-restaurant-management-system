package com.restaurant.restaurant_backend.service;

import com.restaurant.restaurant_backend.dto.AuthResponseDTO;
import com.restaurant.restaurant_backend.dto.LoginRequestDTO;
import com.restaurant.restaurant_backend.dto.RegisterRequestDTO;
import com.restaurant.restaurant_backend.dto.UserDTO;
import com.restaurant.restaurant_backend.entity.User;

public interface AuthService {

    User register(RegisterRequestDTO request);
    AuthResponseDTO login(LoginRequestDTO request);

}