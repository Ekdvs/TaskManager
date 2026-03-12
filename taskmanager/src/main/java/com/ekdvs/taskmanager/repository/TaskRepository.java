package com.ekdvs.taskmanager.repository;

import com.ekdvs.taskmanager.entity.Task;
import com.ekdvs.taskmanager.entity.TaskPriority;
import com.ekdvs.taskmanager.entity.TaskStatus;
import com.ekdvs.taskmanager.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    Page<Task> findByUser(User user, Pageable pageable);

    Page<Task> findByUserAndStatus(User user, TaskStatus status, Pageable pageable);

    Page<Task> findByUserAndPriority(User user, TaskPriority priority, Pageable pageable);

    Page<Task> findByUserAndStatusAndPriority(User user, TaskStatus status, TaskPriority priority, Pageable pageable);
}