package com.example.taskmanager;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

// @Entity tells Spring Boot that this class represents a table in the database
@Entity
public class Task {

    // @Id says this is the primary key (unique ID)
    // @GeneratedValue says the database should generate this ID automatically
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of the task
    @jakarta.validation.constraints.NotBlank(message = "Title cannot be empty")
    private String title;

    // Detailed description of the task
    private String description;

    // Whether the task is finished or not
    private boolean isDone;

    // When the task was created
    private LocalDateTime createdDate;

    // A special method called "Constructor" to create a new Task easily
    public Task() {
        // Default constructor is needed by Spring
        this.createdDate = LocalDateTime.now(); // Set creation time automatically
    }

    // Another helper to create a task with title and description
    public Task(String title, String description) {
        this.title = title;
        this.description = description;
        this.isDone = false; // Default to not done
        this.createdDate = LocalDateTime.now();
    }

    // --- Getters and Setters (How we access and change the variables) ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
