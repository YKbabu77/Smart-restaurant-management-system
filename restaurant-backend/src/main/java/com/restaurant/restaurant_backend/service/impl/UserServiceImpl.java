package com.restaurant.restaurant_backend.service.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.dto.UserDTO;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.exception.ResourceNotFoundException;
import com.restaurant.restaurant_backend.mapper.UserMapper;
import com.restaurant.restaurant_backend.repository.UserRepository;
import com.restaurant.restaurant_backend.service.UserService;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                            .stream()
                            .map(UserMapper::toDTO)
                            .toList();
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
         User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return Optional.of(UserMapper.toDTO(user));
        // return userRepository.findById(id)
        //    .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setAddress(user.getAddress());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}