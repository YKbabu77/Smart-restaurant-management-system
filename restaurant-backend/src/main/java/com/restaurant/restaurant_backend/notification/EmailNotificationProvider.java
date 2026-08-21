package com.restaurant.restaurant_backend.notification;

import org.springframework.stereotype.Component;

import com.restaurant.restaurant_backend.entity.NotificationType;
import com.restaurant.restaurant_backend.entity.User;

@Component
public class EmailNotificationProvider
        implements NotificationProvider {

    @Override
    public void send(
            User user,
            NotificationType type,
            String message) {

        if (!Boolean.TRUE.equals(
                user.getEmailNotifications())) {

            return;
        }

        /*
         * TEMPORARY IMPLEMENTATION
         *
         * Real email service will be connected later.
         */

        System.out.println(
                "================================="
        );

        System.out.println(
                "EMAIL NOTIFICATION"
        );

        System.out.println(
                "Email: " + user.getEmail()
        );

        System.out.println(
                "Type: " + type
        );

        System.out.println(
                "Message: " + message
        );

        System.out.println(
                "================================="
        );
    }
}
