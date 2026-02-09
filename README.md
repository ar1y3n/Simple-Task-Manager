# Simple Task Management System - Beginner Guide

Welcome to your first Full Stack Project! This guide will help you run the application and understand how it works.

## 📂 Project Structure

```
Task-Management-System/
├── backend/                  # Java Spring Boot Code (The Server)
│   ├── pom.xml               # Dependencies (like a shopping list for code libraries)
│   └── src/main/java/...     # Where your Java code lives
│       ├── Task.java         # The "Thing" we are saving
│       ├── TaskRepository.java # The "Database Manager"
│       ├── TaskController.java # The "Receptionist" (handles requests)
│       └── TaskApplication.java # The "Starter"
└── frontend/                 # React Code (The Website)
    ├── package.json          # Dependencies for React
    ├── public/               # HTML template
    └── src/                  # The actual website code
        ├── App.js            # The main page
        └── App.css           # Styling
```

---

## 🚀 How to Run It (Step-by-Step)

### Part 1: The Backend (Java + Database)

1.  **Install Prerequisites**:
    *   **Java 17 (or newer)**: Download from [Adoptium](https://adoptium.net/).
    *   **PostgreSQL**: Download and install from [postgresql.org](https://www.postgresql.org/).
        *   During install, remember your **password**! (Default is usually `password` or `postgres`).

2.  **Create the Database**:
    *   Open "pgAdmin" (installed with PostgreSQL) OR use the command line:
        ```bash
        psql -U postgres
        # Enter your password
        CREATE DATABASE task_db;
        ```

3.  **Configure the App**:
    *   Open `backend/src/main/resources/application.properties`.
    *   Check `spring.datasource.password`. If your Postgres password is not `password`, change it there!

4.  **Run the Server**:
    *   Open a terminal (Command Prompt or PowerShell).
    *   Go to the backend folder: `cd C:\Users\Ariyen\Task-Management-System\backend`
    *   Run this command:
        ```bash
        ./mvnw spring-boot:run
        ```
        *(Note: If `./mvnw` doesn't work, ensure you have Maven installed or run `mvn spring-boot:run`)*
    *   Wait until you see: `Started TaskApplication in ... seconds`.
    *   **It's working if:** You can go to `http://localhost:8080/api/tasks` in your browser and see `[]` (an empty list).

### Part 2: The Frontend (React Website)

1.  **Install Node.js**:
    *   Download from [nodejs.org](https://nodejs.org/) (LTS version).

2.  **Prepare the Project**:
    *   Open a **NEW** terminal window (keep the backend running in the first one!).
    *   Go to the frontend folder: `cd C:\Users\Ariyen\Task-Management-System\frontend`
    *   Install the dependencies (only need to do this once):
        ```bash
        npm install
        ```

3.  **Start the Website**:
    *   Run:
        ```bash
        npm start
        ```
    *   A browser window should automatically open at `http://localhost:3000`.

---

## 🎓 Explain Like I'm 5 (Concepts)

### 1. What is Spring Boot?
Imagine building a car. Instead of building the engine, wheels, and seats from scratch, Spring Boot gives you a pre-assembled car frame where you just need to choose the paint color and radio station. It does all the heavy lifting (configuration) so you can focus on writing your specific logic (the tasks).

### 2. What is a REST API?
Think of a waiter in a restaurant. You (the Frontend/Customer) cannot go into the kitchen (the Database) to cook your own food. You must speak to the waiter (the API). You tell the waiter "I want a burger" (GET request) or "Here is my order" (POST request), and the waiter brings it to the kitchen and comes back with your food. `TaskController.java` is your waiter.

### 3. How does React talk to Spring Boot?
React uses a telephone called `fetch()`. When you click "Add Task", React picks up the phone and calls `http://localhost:8080/api/tasks`. It says "Hey Spring Boot, here is a new task title, please save it." Spring Boot says "Okay!", saves it to the database, and hangs up.

### 4. What does the database do?
It's a digital filing cabinet. If you didn't have a database, all your tasks would disappear every time you restarted the computer. PostgreSQL writes them onto the hard drive so they stay there forever until you delete them.

---

## 🛠️ Troubleshooting (Common Errors)

**Error 1: "Connection refused" or "Db connection failed"**
*   **Cause**: Your database isn't running or the password in `application.properties` is wrong.
*   **Fix**: Open pgAdmin to make sure Postgres is running. Double-check the `spring.datasource.password` in the file.

**Error 2: "Port 8080 is already in use"**
*   **Cause**: You might have run the backend twice or have another app open.
*   **Fix**: Close other terminal windows, or restart your computer.

**Error 3: React shows "Network Error" when trying to add a task**
*   **Cause**: The Backend is not running.
*   **Fix**: Check your first terminal window. Is Spring Boot still running? Did it crash?

**Error 4: "mvnw is not recognized"**
*   **Cause**: Maven wrapper files might be missing (since we created files manually).
*   **Fix**: If you have Maven installed globally, just type `mvn spring-boot:run`. If not, [install Maven](https://maven.apache.org/install.html).

---

## 📚 What to Learn Next?

1.  **Validation**: prevent adding empty tasks (Backend: `@Valid`, Frontend: `if (!title) ...`).
2.  **Error Handling**: Show a nice red box if the server is down.
3.  **Better CSS**: Try `Bootstrap` or `Tailwind` to make it look even cooler.
4.  **Deployment**: Learn how to put this on the real internet (Heroku, Vercel, Render).

Good luck! You are now a Full Stack Developer! 🎉
