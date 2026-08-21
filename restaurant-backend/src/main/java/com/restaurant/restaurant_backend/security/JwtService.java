package com.restaurant.restaurant_backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.restaurant.restaurant_backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final SecretKey secretKey;

    private final long expiration;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration) {

        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes()
        );

        this.expiration = expiration;
    }

    public String generateToken(User user) {

        Date now = new Date();

        Date expiryDate = new Date(
                now.getTime() + expiration
        );

        return Jwts.builder()
                .subject(user.getEmail() != null
                        ? user.getEmail()
                        : user.getPhone())
                .claim("userId", user.getId())
                .claim("role", user.getRole().name())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String extractIdentifier(String token) {

        return getClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {

        try {

            Claims claims = getClaims(token);

            return claims.getExpiration()
                    .after(new Date());

        } catch (Exception e) {

            return false;
        }
    }

    private Claims getClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}