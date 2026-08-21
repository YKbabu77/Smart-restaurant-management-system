package com.restaurant.restaurant_backend.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier)
            throws UsernameNotFoundException {

        User user;

        if (identifier.contains("@")) {

            user = userRepository.findByEmail(identifier)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "User not found"));

        } else {

            user = userRepository.findByPhone(identifier)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "User not found"));
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(identifier)
                .password(user.getPassword())
                .authorities(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().name()
                        )
                )
                .disabled(!Boolean.TRUE.equals(user.getIsActive()))
                .build();
    }
}