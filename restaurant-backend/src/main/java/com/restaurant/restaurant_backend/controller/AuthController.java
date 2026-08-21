package com.restaurant.restaurant_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.restaurant_backend.dto.LoginRequestDTO;
import com.restaurant.restaurant_backend.dto.RegisterRequestDTO;
import com.restaurant.restaurant_backend.dto.UserDTO;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.service.AuthService;
import com.restaurant.restaurant_backend.dto.AuthResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173",
        "https://restaurant-management-system-xi-five.vercel.app"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(
            @Valid @RequestBody RegisterRequestDTO request) {

        User user = authService.register(request);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
        @Valid @RequestBody LoginRequestDTO request) {

    AuthResponseDTO authResponse = authService.login(request);

    return ResponseEntity.ok(authResponse);
    }
}