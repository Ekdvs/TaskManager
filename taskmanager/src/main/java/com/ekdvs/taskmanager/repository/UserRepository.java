package com.ekdvs.taskmanager.repository;

import com.ekdvs.taskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
