package com.restaurant.restaurant_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.restaurant.restaurant_backend.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            // JWT authentication does not use browser sessions
            .csrf(csrf -> csrf.disable())

            // Enable CORS configuration
            .cors(cors -> {})

            // Do not create HTTP sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                // Authentication endpoints
                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                // Public food/menu endpoints
                .requestMatchers(
                    "/api/foods/**",
                    "/api/categories/**"
                ).permitAll()

                // Admin endpoints
                .requestMatchers(
                    "/api/admin/**"
                ).hasRole("ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // Add JWT filter before Spring's username/password filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}