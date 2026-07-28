package com.restaurant.restaurant_backend.service.impl;

import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.LoginRequestDTO;
import com.restaurant.restaurant_backend.dto.RegisterRequestDTO;
import com.restaurant.restaurant_backend.dto.UserDTO;
import com.restaurant.restaurant_backend.entity.Role;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.mapper.UserMapper;
import com.restaurant.restaurant_backend.repository.UserRepository;
import com.restaurant.restaurant_backend.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(RegisterRequestDTO request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        // For now (Version 1)
        user.setPassword(request.getPassword());

        // Default role
        user.setRole(Role.CUSTOMER);

        return userRepository.save(user);
    }
    @Override
public UserDTO login(LoginRequestDTO request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

    if (!user.getPassword().equals(request.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

    return UserMapper.toDTO(user);
    }
}