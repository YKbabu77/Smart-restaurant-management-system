package com.restaurant.restaurant_backend.service;

import com.restaurant.restaurant_backend.entity.NotificationType;
import com.restaurant.restaurant_backend.entity.User;

public interface NotificationService {

    void sendWhatsApp(
            User user,
            NotificationType type,
            String message
    );

    void sendEmail(
            User user,
            NotificationType type,
            String subject,
            String message
    );
}