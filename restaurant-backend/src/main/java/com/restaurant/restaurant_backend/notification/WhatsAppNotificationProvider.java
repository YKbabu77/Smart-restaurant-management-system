package com.restaurant.restaurant_backend.notification;

import org.springframework.stereotype.Component;

import com.restaurant.restaurant_backend.entity.NotificationType;
import com.restaurant.restaurant_backend.entity.User;

@Component
public class WhatsAppNotificationProvider
        implements NotificationProvider {

    @Override
    public void send(
            User user,
            NotificationType type,
            String message) {

        if (!Boolean.TRUE.equals(
                user.getWhatsappNotifications())) {

            return;
        }

        /*
         * TEMPORARY IMPLEMENTATION
         *
         * Real WhatsApp Business Cloud API
         * will be connected later.
         */

        System.out.println(
                "================================="
        );

        System.out.println(
                "WHATSAPP NOTIFICATION"
        );

        System.out.println(
                "Phone: " + user.getPhone()
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
