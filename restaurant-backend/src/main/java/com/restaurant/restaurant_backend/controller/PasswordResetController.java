package com.restaurant.restaurant_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.restaurant.restaurant_backend.dto.ForgotPasswordRequestDTO;
import com.restaurant.restaurant_backend.dto.ResetPasswordRequestDTO;
import com.restaurant.restaurant_backend.service.PasswordResetService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://restaurant-management-system-xi-five.vercel.app"
})
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(
            PasswordResetService passwordResetService) {

        this.passwordResetService = passwordResetService;
    }


        @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDTO request) {

        passwordResetService.createResetToken(
                request.getIdentifier()
        );

        return ResponseEntity.ok(
                java.util.Map.of(
                        "message",
                        "If an account exists with that email or phone number, a password reset link will be sent."
                )
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDTO request) {

        passwordResetService.resetPassword(
                request.getToken(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(
                java.util.Map.of(
                        "message",
                        "Password reset successfully"
                )
        );
    }
}