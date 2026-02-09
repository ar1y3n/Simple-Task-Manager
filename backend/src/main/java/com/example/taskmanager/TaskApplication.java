package com.example.taskmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication is the magic annotation that sets up everything
@SpringBootApplication
public class TaskApplication {

	public static void main(String[] args) {
		// This line starts the entire application
		SpringApplication.run(TaskApplication.class, args);
	}

}
