package com.restaurant.restaurant_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {

    @NotBlank(message = "Email or phone number is required")
    @Email(message = "Please enter a valid email or phone number")
    private String identifier;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequestDTO() {
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}