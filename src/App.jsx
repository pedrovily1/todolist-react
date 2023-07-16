import React from 'react';
import './index.css';

function App() {
  const todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ];

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input type="text" value="" />
      <button>Add todo</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <input type="checkbox" checked={todo.completed} />
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
