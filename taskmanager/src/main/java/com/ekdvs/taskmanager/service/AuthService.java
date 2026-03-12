package com.ekdvs.taskmanager.service;

import com.ekdvs.taskmanager.dto.LoginRequest;
import com.ekdvs.taskmanager.dto.RegisterRequest;
import com.ekdvs.taskmanager.entity.User;

public interface AuthService {

    User register(RegisterRequest request);

    String login(LoginRequest request);
}