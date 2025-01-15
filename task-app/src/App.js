import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar Axios
import "./App.css"; // Importar los estilos

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const url = "https://localhost:7292/api/task";
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas usando Axios
  const fetchTasks = async () => {
    try {
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      setError("Failed to fetch tasks. Please try again.");
    }
  };

  // Función para crear una tarea usando Axios
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = { name, description };
      const response = await axios.post(url, newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]); // Agregar la nueva tarea
      setName(""); // Limpiar el formulario
      setDescription("");
    } catch (err) {
      console.error("Error creating task:", err.message);
      setError("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1 className="title">Task Manager</h1>
      {error && <p className="error">Error: {error}</p>}

      {/* Formulario para crear tareas */}
      <form className="task-form" onSubmit={handleCreateTask}>
        <h2>Create Task</h2>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Task Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Create Task</button>
      </form>

      {/* Lista de tareas */}
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>{task.name}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
