package com.ekdvs.taskmanager.serviceImplementation;

import com.ekdvs.taskmanager.dto.TaskRequest;
import com.ekdvs.taskmanager.dto.TaskResponse;
import com.ekdvs.taskmanager.dto.UserResponse;
import com.ekdvs.taskmanager.entity.*;
import com.ekdvs.taskmanager.repository.TaskRepository;
import com.ekdvs.taskmanager.repository.UserRepository;
import com.ekdvs.taskmanager.service.TaskService;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository,
                           UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Task createTask(TaskRequest request, String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Task task = Task.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .priority(request.getPriority())
                    .status(request.getStatus())
                    .dueDate(request.getDueDate()) // LocalDate directly
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .user(user)
                    .build();

            return taskRepository.save(task);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create task: " + e.getMessage());
        }
    }

    @Override
    public Task updateTask(Long id, TaskRequest request, String email) {
        try {
            Task task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            task.setTitle(request.getTitle());
            task.setDescription(request.getDescription());
            task.setPriority(request.getPriority());
            task.setStatus(request.getStatus());
            task.setDueDate(request.getDueDate()); // LocalDate directly
            task.setUpdatedAt(LocalDateTime.now());

            return taskRepository.save(task);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update task: " + e.getMessage());
        }
    }

    @Override
    public void deleteTask(Long id, String email) {
        try {
            Task task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            taskRepository.delete(task);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete task: " + e.getMessage());
        }
    }

    @Override
    public Task markDone(Long id, String email) {
        try {
            Task task = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            task.setStatus(TaskStatus.DONE);
            task.setUpdatedAt(LocalDateTime.now());

            return taskRepository.save(task);
        } catch (Exception e) {
            throw new RuntimeException("Failed to mark task as done: " + e.getMessage());
        }
    }

    @Override
    public Page<Task> getTasksForUser(User user, TaskStatus status, TaskPriority priority, Pageable pageable) {
        try {
            if (status != null && priority != null) {
                return taskRepository.findByUserAndStatusAndPriority(user, status, priority, pageable);
            } else if (status != null) {
                return taskRepository.findByUserAndStatus(user, status, pageable);
            } else if (priority != null) {
                return taskRepository.findByUserAndPriority(user, priority, pageable);
            } else {
                return taskRepository.findByUser(user, pageable);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch tasks: " + e.getMessage());
        }
    }

    @Override
    public Page<Task> getTasksForAdmin(TaskStatus status, TaskPriority priority, Pageable pageable) {
        try {
            if (status != null && priority != null) {
                return taskRepository.findAll((root, query, cb) -> cb.and(
                        cb.equal(root.get("status"), status),
                        cb.equal(root.get("priority"), priority)
                ), pageable);
            } else if (status != null) {
                return taskRepository.findAll((root, query, cb) ->
                        cb.equal(root.get("status"), status), pageable);
            } else if (priority != null) {
                return taskRepository.findAll((root, query, cb) ->
                        cb.equal(root.get("priority"), priority), pageable);
            } else {
                return taskRepository.findAll(pageable);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch admin tasks: " + e.getMessage());
        }
    }

    // --- NEW: Helper to map Task -> TaskResponse safely ---
    public TaskResponse mapToTaskResponse(Task task) {
        UserResponse userResponse = new UserResponse(
                task.getUser().getId(),
                task.getUser().getName(),
                task.getUser().getEmail(),
                task.getUser().getRole()  // NO password here
        );

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                userResponse
        );
    }
}