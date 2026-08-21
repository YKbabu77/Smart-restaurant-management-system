 package com.restaurant.restaurant_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class ForgotPasswordRequestDTO {

    @NotBlank(message = "Email or phone number is required")
    private String identifier;

    public ForgotPasswordRequestDTO() {
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}