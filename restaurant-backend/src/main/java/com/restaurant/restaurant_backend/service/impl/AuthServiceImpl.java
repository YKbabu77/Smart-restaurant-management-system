package com.restaurant.restaurant_backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.AuthResponseDTO;
import com.restaurant.restaurant_backend.security.JwtService;

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
    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterRequestDTO request) {

        // Check if email already exists
        if (request.getEmail() != null &&
            !request.getEmail().isBlank() &&
            userRepository.findByEmail(request.getEmail()).isPresent()) {

        throw new RuntimeException("Email is already registered");
    }
     if (request.getPhone() == null ||
            request.getPhone().isBlank()) {

        throw new RuntimeException("Phone number is required");
    }
        if (userRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new RuntimeException("Phone number is already registered");
    }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setDateOfBirth(request.getDateOfBirth());

        if (request.getEmail() != null &&
                !request.getEmail().isBlank()) {

            user.setEmail(request.getEmail());
        }   

        // For now (Version 2)
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Default role
        user.setRole(Role.CUSTOMER);

        return userRepository.save(user);
    }
   @Override
    public AuthResponseDTO login(LoginRequestDTO request) {

        String identifier = request.getIdentifier();

        User user;

        if (identifier.contains("@")) {

            user = userRepository.findByEmail(identifier)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Invalid email or password"));

        } else {

            user = userRepository.findByPhone(identifier)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Invalid email or password"));
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password");
        }

        if (!Boolean.TRUE.equals(user.getIsActive())) {

            throw new RuntimeException(
                    "Your account is inactive");
        }

        String token = jwtService.generateToken(user);

        UserDTO userDTO = UserMapper.toDTO(user);

        return new AuthResponseDTO(token, userDTO);
}
}