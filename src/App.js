import { FaPlus, FaTrash } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    // Retrieve data from localStorage or initialize with defaults
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: "Learn React", completed: false },
      { id: 2, text: "Build a project", completed: true },
      { id: 3, text: "Write documentation", completed: false },
    ];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Store todos in localStorage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filterTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-box">
        <h1 className="todo-title">Todo List</h1>
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="input-field"
            aria-label="New todo input"
          />
          <button
            type="submit"
            className="add-button"
            aria-label="Add todo"
          >
            <FaPlus />Add
          </button>
        </form>

        <div className="button-group">
          <button onClick={() => setFilter("all")} className={`button ${filter === "all" ? "active" : ""}`}>All</button>
          <button onClick={() => setFilter("active")} className={`button ${filter === "active" ? "active" : ""}`}>Active</button>
          <button onClick={() => setFilter("completed")} className={`button ${filter === "completed" ? "active" : ""}`}>Completed</button>
        </div>

        <ul className="todo-list">
          {filterTodos().map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(<TodoList />, document.getElementById("root"));
