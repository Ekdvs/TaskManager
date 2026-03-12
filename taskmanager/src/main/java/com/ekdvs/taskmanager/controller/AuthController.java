package com.ekdvs.taskmanager.controller;

import com.ekdvs.taskmanager.dto.*;
import com.ekdvs.taskmanager.entity.ApiResponse;
import com.ekdvs.taskmanager.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }


    // REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request){
        try {
            Object registeredUser = authService.register(request);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            "User registered successfully",
                            false,
                            true,
                            registeredUser
                    )
            );
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse<>(
                            "Registration failed: " + e.getMessage(),
                            true,
                            false,
                            null
                    ));
        }
    }

    // LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request){
        try {
            String token = authService.login(request);
            TokenResponse tokenData = new TokenResponse(token);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            "Login successful",
                            false,
                            true,
                            tokenData
                    )
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(401)
                    .body(new ApiResponse<>(
                            "Login failed: " + e.getMessage(),
                            true,
                            false,
                            null
                    ));
        }
    }
}