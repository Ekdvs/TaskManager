package com.ekdvs.taskmanager.serviceImplementation;

import com.ekdvs.taskmanager.dto.LoginRequest;
import com.ekdvs.taskmanager.dto.RegisterRequest;
import com.ekdvs.taskmanager.entity.Role;
import com.ekdvs.taskmanager.entity.User;
import com.ekdvs.taskmanager.repository.UserRepository;
import com.ekdvs.taskmanager.security.JwtService;
import com.ekdvs.taskmanager.service.AuthService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthServiceImpl(UserRepository userRepository,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public User register(RegisterRequest request) {

        try {

            // Validate fields
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                throw new RuntimeException("Name is required");
            }

            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new RuntimeException("Email is required");
            }

            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                throw new RuntimeException("Password is required");
            }

            // Email format validation
            String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
            Pattern pattern = Pattern.compile(emailRegex);

            if (!pattern.matcher(request.getEmail()).matches()) {
                throw new RuntimeException("Invalid email format");
            }

            // Check if user already exists
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email already registered");
            }

            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();

            return userRepository.save(user);

        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    @Override
    public String login(LoginRequest request) {

        try {

            // Validate fields
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new RuntimeException("Email is required");
            }

            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                throw new RuntimeException("Password is required");
            }

            User user = userRepository
                    .findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            return jwtService.generateToken(user.getEmail());

        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }
}