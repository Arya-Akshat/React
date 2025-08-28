// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';

// We'll use axios for simpler API calls, but fetch works too.
// Run `npm install axios` in your frontend folder.
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // 1. Fetch initial todos from the backend when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []); // Empty dependency array means this runs once on mount

  // 2. Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return; // Prevent adding empty tasks
    try {
      const response = await axios.post('/todos', { task });
      // Add the new task to the top of the list in our state
      setTodos([response.data, ...todos]);
      setTask(''); // Clear the input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // 3. Handle toggling the 'done' status of a task
  const handleToggleDone = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`/todos/${id}`, { done: !currentStatus });
      // Update the specific todo in our state
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, done: response.data.done } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // 4. Handle deleting a task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      // Filter out the deleted todo from our state
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add Task</button>
        </form>
      </header>
      <main>
        <TodoList
          todos={todos}
          onToggleDone={handleToggleDone}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
