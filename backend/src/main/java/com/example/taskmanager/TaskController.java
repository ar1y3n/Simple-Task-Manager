package com.example.taskmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController tells Spring this class handles web requests
// @CrossOrigin tells Spring to allow requests from our React app (running on localhost:3000)
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tasks") // All URLs in this class start with /api/tasks
public class TaskController {

    // @Autowired tells Spring to automatically give us a TaskRepository to use
    @Autowired
    private TaskRepository taskRepository;

    // 1. Get all tasks
    // Request: GET /api/tasks
    @GetMapping
    public List<Task> getAllTasks() {
        // Use the repository to fetch everything from the database
        return taskRepository.findAll();
    }

    // 2. Add a new task
    // Request: POST /api/tasks
    // Body: { "title": "...", "description": "..." }
    @PostMapping
    public Task createTask(@jakarta.validation.Valid @RequestBody Task task) {
        // Save the new task to the database and return the saved task
        return taskRepository.save(task);
    }

    // 3. Update a task (Use this to mark as done/undone)
    // Request: PUT /api/tasks/{id}
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        // Find the task by ID
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        // Update the task's information
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDone(taskDetails.isDone());

        // Save the updated task back to the database
        return taskRepository.save(task);
    }

    // 4. Delete a task
    // Request: DELETE /api/tasks/{id}
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        // Delete the task from the database
        taskRepository.deleteById(id);
    }
}
