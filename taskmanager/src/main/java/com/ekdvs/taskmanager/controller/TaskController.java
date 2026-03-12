package com.ekdvs.taskmanager.controller;

import com.ekdvs.taskmanager.dto.TaskRequest;
import com.ekdvs.taskmanager.dto.TaskResponse;
import com.ekdvs.taskmanager.entity.Role;
import com.ekdvs.taskmanager.entity.Task;
import com.ekdvs.taskmanager.entity.TaskPriority;
import com.ekdvs.taskmanager.entity.TaskStatus;
import com.ekdvs.taskmanager.entity.User;
import com.ekdvs.taskmanager.repository.UserRepository;
import com.ekdvs.taskmanager.service.TaskService;
import com.ekdvs.taskmanager.serviceImplementation.TaskServiceImpl;

import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    public TaskController(TaskService taskService, UserRepository userRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
    }

    // --- CREATE TASK ---
    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskRequest taskRequest,
                                        Authentication authentication) {
        try {
            Task task = taskService.createTask(taskRequest, authentication.getName());

            // map Task → TaskResponse
            TaskResponse response = ((TaskServiceImpl) taskService).mapToTaskResponse(task);

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message", "Task created successfully",
                            "error", false,
                            "success", true,
                            "data", response
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of(
                            "message", "Failed: " + e.getMessage(),
                            "error", true,
                            "success", false
                    )
            );
        }
    }

    // --- UPDATE TASK ---
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,
                                        @RequestBody TaskRequest taskRequest,
                                        Authentication authentication) {
        try {
            Task task = taskService.updateTask(id, taskRequest, authentication.getName());
            TaskResponse response = ((TaskServiceImpl) taskService).mapToTaskResponse(task);

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message", "Task updated successfully",
                            "error", false,
                            "success", true,
                            "data", response
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of(
                            "message", "Failed: " + e.getMessage(),
                            "error", true,
                            "success", false
                    )
            );
        }
    }

    // --- MARK TASK DONE ---
    @PutMapping("/mark/{id}/done")
    public ResponseEntity<?> markTaskDone(@PathVariable Long id,
                                          Authentication authentication) {
        try {
            Task task = taskService.markDone(id, authentication.getName());
            TaskResponse response = ((TaskServiceImpl) taskService).mapToTaskResponse(task);

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message", "Task marked as DONE",
                            "error", false,
                            "success", true,
                            "data", response
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of(
                            "message", "Failed: " + e.getMessage(),
                            "error", true,
                            "success", false
                    )
            );
        }
    }

    // --- DELETE TASK ---
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,
                                        Authentication authentication) {
        try {
            taskService.deleteTask(id, authentication.getName());
            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message", "Task deleted successfully",
                            "error", false,
                            "success", true
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of(
                            "message", "Failed: " + e.getMessage(),
                            "error", true,
                            "success", false
                    )
            );
        }
    }

    // --- GET TASKS FOR USER/ADMIN ---
    @GetMapping("/getall")
    public ResponseEntity<?> getTasks(Authentication authentication,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "5") int size,
                                      @RequestParam(defaultValue = "dueDate") String sortBy,
                                      @RequestParam(required = false) TaskStatus status,
                                      @RequestParam(required = false) TaskPriority priority) {
        try {
            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            Page<Task> tasks;

            if (user.getRole() == Role.ADMIN) {
                tasks = taskService.getTasksForAdmin(status, priority, pageable);
            } else {
                tasks = taskService.getTasksForUser(user, status, priority, pageable);
            }

            // Map each Task to TaskResponse to remove password
            Page<TaskResponse> response = tasks.map(t -> ((TaskServiceImpl) taskService).mapToTaskResponse(t));

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message", "Tasks fetched successfully",
                            "error", false,
                            "success", true,
                            "data", response
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of(
                            "message", "Failed: " + e.getMessage(),
                            "error", true,
                            "success", false
                    )
            );
        }
    }
}