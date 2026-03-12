package com.ekdvs.taskmanager.service;

import com.ekdvs.taskmanager.dto.TaskRequest;
import com.ekdvs.taskmanager.entity.Task;
import com.ekdvs.taskmanager.entity.TaskPriority;
import com.ekdvs.taskmanager.entity.TaskStatus;
import com.ekdvs.taskmanager.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    Task createTask(TaskRequest request, String email);

    Task updateTask(Long id, TaskRequest request, String email);

    void deleteTask(Long id, String email);

    Task markDone(Long id, String email);

    Page<Task> getTasksForUser(User user, TaskStatus status, TaskPriority priority, Pageable pageable);

    Page<Task> getTasksForAdmin(TaskStatus status, TaskPriority priority, Pageable pageable);
}