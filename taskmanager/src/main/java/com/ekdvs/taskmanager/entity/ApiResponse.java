package com.ekdvs.taskmanager.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class ApiResponse<T> {

    private String message;
    private boolean error;
    private boolean success;
    private T data;

    public ApiResponse(String message, boolean error, boolean success, T data) {
        this.message = message;
        this.error = error;
        this.success = success;
        this.data = data;
    }
}
