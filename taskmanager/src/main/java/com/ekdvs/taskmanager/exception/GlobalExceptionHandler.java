package com.ekdvs.taskmanager.exception;

import com.ekdvs.taskmanager.entity.ApiResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNotFound(ResourceNotFoundException ex){

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(
                        ex.getMessage(),
                        true,
                        false,
                        null
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(Exception ex){

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(
                        ex.getMessage(),
                        true,
                        false,
                        null
                ));
    }
}