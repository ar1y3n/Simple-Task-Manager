import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    // State variables to hold our data
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Use environment variable for API URL, or default to localhost
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/tasks';

    // useEffect runs once when the page loads
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to get tasks from the backend
    const fetchTasks = async () => {
        try {
            const fetchTasks = async () => {
                try {
                    const response = await fetch(API_URL);
                    const data = await response.json();
                    setTasks(data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            };

            // Function to add a new task
            const [error, setError] = useState('');

            const [editingId, setEditingId] = useState(null);
            const [editTitle, setEditTitle] = useState('');
            const [editDescription, setEditDescription] = useState('');

            const startEditing = (task) => {
                setEditingId(task.id);
                setEditTitle(task.title);
                setEditDescription(task.description);
            };

            const cancelEdit = () => {
                setEditingId(null);
                setEditTitle('');
                setEditDescription('');
            };

            const saveEdit = async (id) => {
                const currentTask = tasks.find(t => t.id === id);
                try {
                    const saveEdit = async (id) => {
                        const currentTask = tasks.find(t => t.id === id);
                        try {
                            const response = await fetch(`${API_URL}/${id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    title: editTitle,
                                    description: editDescription,
                                    done: currentTask.done
                                }),
                            });

                            if (!response.ok) throw new Error("Failed to update");

                            cancelEdit();
                            fetchTasks();
                        } catch (error) {
                            console.error("Error updating task:", error);
                            setError("Failed to save changes. Try again.");
                        }
                    };

                    // Function to add a new task
                    const addTask = async (e) => {
                        e.preventDefault(); // Stop page refresh
                        if (!title) {
                            setError("Title is required!");
                            return;
                        }

                        const newTask = { title, description };

                        try {
                            const response = await fetch(API_URL, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newTask),
                            });

                            if (!response.ok) {
                                setError("Failed to add task. server responded with: " + response.status);
                                return;
                            }

                            // Clear form and refresh list
                            setTitle('');
                            setDescription('');
                            setError('');
                            fetchTasks();
                        } catch (error) {
                            console.error("Error adding task:", error);
                            setError("Network error. Is the backend running?");
                        }
                    };

                    // Function to mark a task as done/undone
                    const toggleDone = async (task) => {
                        const updatedTask = { ...task, done: !task.done };

                        try {
                            try {
                                await fetch(`${API_URL}/${task.id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(updatedTask),
                                });
                                fetchTasks(); // Refresh list
                            } catch (error) {
                                console.error("Error updating task:", error);
                            }
                        };

                        // Function to delete a task
                        const deleteTask = async (id) => {
                            if (!window.confirm("Are you sure?")) return;

                            try {
                                try {
                                    await fetch(`${API_URL}/${id}`, {
                                        method: 'DELETE',
                                    });
                                    fetchTasks(); // Refresh list
                                } catch (error) {
                                    console.error("Error deleting task:", error);
                                }
                            };

                            // Calculate stats
                            const totalTasks = tasks.length;
                            const completedTasks = tasks.filter(t => t.done).length;
                            const pendingTasks = totalTasks - completedTasks;

                            return (
                                <div className="app-container">
                                    <header>
                                        <h1>📝 Simple Task Manager</h1>
                                        <div className="stats-container">
                                            <div className="stat-box">
                                                <span className="stat-number">{totalTasks}</span>
                                                <span className="stat-label">Total</span>
                                            </div>
                                            <div className="stat-box pending">
                                                <span className="stat-number">{pendingTasks}</span>
                                                <span className="stat-label">Pending</span>
                                            </div>
                                            <div className="stat-box completed">
                                                <span className="stat-number">{completedTasks}</span>
                                                <span className="stat-label">Done</span>
                                            </div>
                                        </div>
                                    </header>

                                    {/* Form to add new task */}
                                    <div className="task-form">
                                        <h2>Add New Task</h2>
                                        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                                        <form onSubmit={addTask}>
                                            <input
                                                type="text"
                                                placeholder="Task Title..."
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="input-box"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description (optional)..."
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="input-box"
                                            />
                                            <button type="submit" className="add-btn">Add Task</button>
                                        </form>
                                    </div>

                                    {/* List of existing tasks */}
                                    <div className="task-list">
                                        <h2>My Tasks</h2>
                                        {tasks.length === 0 ? <p>No tasks yet. Add one!</p> : null}

                                        {tasks.map((task) => (
                                            <div key={task.id} className={`task-card ${task.done ? 'done' : ''}`}>
                                                {editingId === task.id ? (
                                                    // --- EDIT MODE ---
                                                    <>
                                                        <div className="task-info">
                                                            <input
                                                                className="edit-input"
                                                                value={editTitle}
                                                                onChange={(e) => setEditTitle(e.target.value)}
                                                                autoFocus
                                                            />
                                                            <input
                                                                className="edit-input"
                                                                value={editDescription}
                                                                onChange={(e) => setEditDescription(e.target.value)}
                                                                placeholder="Description"
                                                            />
                                                        </div>
                                                        <div className="task-actions">
                                                            <button onClick={() => saveEdit(task.id)} className="save-btn">💾 Save</button>
                                                            <button onClick={cancelEdit} className="cancel-btn">❌ Cancel</button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    // --- VIEW MODE ---
                                                    <>
                                                        <div className="task-info">
                                                            <h3>{task.title}</h3>
                                                            <p>{task.description}</p>
                                                        </div>
                                                        <div className="task-actions">
                                                            <button onClick={() => startEditing(task)} className="edit-btn">✏️ Edit</button>
                                                            <button
                                                                onClick={() => toggleDone(task)}
                                                                className={`done-btn ${task.done ? 'undo' : ''}`}
                                                            >
                                                                {task.done ? 'Undo' : 'Done'}
                                                            </button>
                                                            <button onClick={() => deleteTask(task.id)} className="delete-btn">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <footer>
                                        <p>Built with ❤️ by Ariyen</p>
                                    </footer>
                                </div>
                            );
                        }

                        export default App;
