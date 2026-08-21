package com.restaurant.restaurant_backend.notification;

import com.restaurant.restaurant_backend.entity.NotificationType;
import com.restaurant.restaurant_backend.entity.User;

public interface NotificationProvider {

    void send(
            User user,
            NotificationType type,
            String message
    );
}