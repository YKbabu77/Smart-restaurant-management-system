package com.restaurant.restaurant_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LoginRequestDTO {

    @NotBlank(message = "Phone number or email is required")
    @Pattern(
        regexp = "^(?:[6-9]\\d{9}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,})$",
        message = "Please enter a valid email or phone number"
    )
    private String identifier;

    @NotBlank(message = "Password is required")
    @Size(
        min = 6,
        max = 20,
        message = "Password must be between 6 and 20 characters"
    )
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