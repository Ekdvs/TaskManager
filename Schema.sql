-- ============================================================
-- TaskFlow Manager — Database Schema
-- https://github.com/Ekdvs/TaskManager
-- ============================================================

CREATE DATABASE IF NOT EXISTS taskmanager
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE taskmanager;

-- ------------------------------------------------------------
-- Table: user
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user (
  id         BIGINT        NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: task
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS task (
  id           BIGINT        NOT NULL AUTO_INCREMENT,
  title        VARCHAR(255)  NOT NULL,
  description  TEXT,
  status       ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TODO',
  priority     ENUM('LOW', 'MEDIUM', 'HIGH')        NOT NULL DEFAULT 'MEDIUM',
  due_date     DATE,
  created_at   DATETIME      NOT NULL,
  updated_at   DATETIME      NOT NULL,
  user_id      BIGINT        NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_task_user FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Indexes for performance
-- ------------------------------------------------------------
CREATE INDEX idx_task_user_id  ON task (user_id);
CREATE INDEX idx_task_status   ON task (status);
CREATE INDEX idx_task_priority ON task (priority);
CREATE INDEX idx_task_due_date ON task (due_date);

-- ------------------------------------------------------------
