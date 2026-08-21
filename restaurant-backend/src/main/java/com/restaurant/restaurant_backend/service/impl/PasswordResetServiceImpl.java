package com.restaurant.restaurant_backend.service.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.entity.PasswordResetToken;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.repository.PasswordResetTokenRepository;
import com.restaurant.restaurant_backend.repository.UserRepository;
import com.restaurant.restaurant_backend.entity.NotificationType;
import com.restaurant.restaurant_backend.service.NotificationService;
import com.restaurant.restaurant_backend.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Value("${app.frontend-url}")
    private String frontendUrl;
    private final NotificationService notificationService;
    private final SecureRandom secureRandom = new SecureRandom();

    public PasswordResetServiceImpl(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            NotificationService notificationService) {

        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationService = notificationService;
    }

   @Override
public void createResetToken(String identifier) {

    User user;

    if (identifier.contains("@")) {

        user = userRepository.findByEmail(identifier)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No account found with this email"));

    } else {

        user = userRepository.findByPhone(identifier)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No account found with this phone number"));
    }

    // Delete previous reset token
    tokenRepository.deleteByUserId(user.getId());

    // Generate secure random token
    byte[] randomBytes = new byte[32];

    secureRandom.nextBytes(randomBytes);

    String token = Base64.getUrlEncoder()
            .withoutPadding()
            .encodeToString(randomBytes);

    PasswordResetToken resetToken =
            new PasswordResetToken();

    resetToken.setToken(token);
    resetToken.setUser(user);

    resetToken.setExpiresAt(
            LocalDateTime.now().plusMinutes(15)
    );

    resetToken.setUsed(false);

    tokenRepository.save(resetToken);


    // Create frontend reset URL
    String resetUrl =
            frontendUrl
            + "/reset-password?token="
            + token;


    String message =
            "Food Paradise Password Reset\n\n"
            + "Click the link below to reset your password:\n\n"
            + resetUrl
            + "\n\n"
            + "This link will expire in 15 minutes.\n\n"
            + "If you did not request a password reset, "
            + "please ignore this message.";


    // Send through WhatsApp
    notificationService.sendWhatsApp(
            user,
            NotificationType.PASSWORD_RESET,
            message
    );


    // Send through Email
    notificationService.sendEmail(
            user,
            NotificationType.PASSWORD_RESET,
            "Food Paradise - Password Reset",
            message
    );
}

    @Override
    public void resetPassword(
            String token,
            String newPassword) {

        PasswordResetToken resetToken =
                tokenRepository.findByToken(token)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid reset token"));


        // Check if token was already used
        if (resetToken.isUsed()) {

            throw new RuntimeException(
                    "This reset token has already been used");
        }


        // Check token expiration
        if (resetToken.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Reset token has expired");
        }


        User user = resetToken.getUser();


        // Encrypt the new password
        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);


        // Mark token as used
        resetToken.setUsed(true);

        tokenRepository.save(resetToken);
    }
}