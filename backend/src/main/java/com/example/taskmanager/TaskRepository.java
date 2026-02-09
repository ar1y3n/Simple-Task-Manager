package com.example.taskmanager;

import org.springframework.data.jpa.repository.JpaRepository;

// This interface is all we need to talk to the database!
// By extending JpaRepository<Task, Long>, Spring Boot automatically gives us methods like:
// - findAll()
// - save(Task t)
// - findById(Long id)
// - deleteById(Long id)
// We don't need to write any SQL code ourselves.

public interface TaskRepository extends JpaRepository<Task, Long> {
}
