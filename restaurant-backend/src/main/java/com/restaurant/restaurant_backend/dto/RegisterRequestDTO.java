package com.restaurant.restaurant_backend.dto;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequestDTO {

    @NotBlank(message = "Full name is required")
    @Size(
        min = 3,
        max = 50,
        message = "Full name must be between 3 and 50 characters"
    )
    private String fullName;

    @Email(message = "Please enter a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Please enter a valid 10-digit phone number"
    )
    private String phone;

    private Date dateOfBirth;

    @NotBlank(message = "Password is required")
    @Size(
        min = 6,
        max = 20,
        message = "Password must be between 6 and 20 characters"
    )
    private String password;

    public RegisterRequestDTO() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}