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

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request){

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "User registered successfully",
                        false,
                        true,
                        authService.register(request)
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request){

        String token = authService.login(request);

        // Wrap the token inside TokenResponse
        TokenResponse tokenData = new TokenResponse( token);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Login successful",
                        false,
                        true,
                        tokenData
                )
        );
    }
}