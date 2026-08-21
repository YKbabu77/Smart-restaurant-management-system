package com.restaurant.restaurant_backend.service.impl;

import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.entity.NotificationType;
import com.restaurant.restaurant_backend.entity.User;
import com.restaurant.restaurant_backend.notification.EmailNotificationProvider;
import com.restaurant.restaurant_backend.notification.WhatsAppNotificationProvider;
import com.restaurant.restaurant_backend.service.NotificationService;

@Service
public class NotificationServiceImpl
        implements NotificationService {

    private final WhatsAppNotificationProvider whatsappProvider;
    private final EmailNotificationProvider emailProvider;

    public NotificationServiceImpl(
            WhatsAppNotificationProvider whatsappProvider,
            EmailNotificationProvider emailProvider) {

        this.whatsappProvider = whatsappProvider;
        this.emailProvider = emailProvider;
    }

    @Override
    public void sendWhatsApp(
            User user,
            NotificationType type,
            String message) {

        whatsappProvider.send(
                user,
                type,
                message
        );
    }

    @Override
    public void sendEmail(
            User user,
            NotificationType type,
            String subject,
            String message) {

        emailProvider.send(
                user,
                type,
                subject + "\n\n" + message
        );
    }
}