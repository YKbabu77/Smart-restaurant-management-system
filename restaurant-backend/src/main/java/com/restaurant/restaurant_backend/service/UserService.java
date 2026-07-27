package com.restaurant.restaurant_backend.service;

import java.util.List;
import java.util.Optional;

import com.restaurant.restaurant_backend.entity.User;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

}
