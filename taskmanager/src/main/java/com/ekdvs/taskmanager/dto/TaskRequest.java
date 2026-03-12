package com.ekdvs.taskmanager.dto;

import com.ekdvs.taskmanager.entity.TaskPriority;
import com.ekdvs.taskmanager.entity.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate dueDate;
}