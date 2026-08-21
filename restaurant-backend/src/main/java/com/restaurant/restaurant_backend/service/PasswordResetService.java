package com.restaurant.restaurant_backend.service;

public interface PasswordResetService {

    void createResetToken(String identifier);

    void resetPassword(String token, String newPassword);
}