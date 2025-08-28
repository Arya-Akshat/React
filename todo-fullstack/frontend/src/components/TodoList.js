// frontend/src/components/TodoList.js
import React from 'react';

function TodoList({ todos, onToggleDone, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-message">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id} className={todo.done ? 'done' : ''}>
          <span className="task-text" onClick={() => onToggleDone(todo._id, todo.done)}>
            {todo.task}
          </span>
          <button className="delete-btn" onClick={() => onDelete(todo._id)}>
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
