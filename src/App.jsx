import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  function addTodo() {
    const newTodo = { text: newTodoText };

    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then(response => response.json())
      .then(data => {
        setTodos(prevTodos => [...prevTodos, data]);
        setNewTodoText('');
      });
  }

  function deleteTodo(id) {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      });
  }

  function updateTodo(id, text, completed) {
    const updatedTodo = { text, completed };

    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .then(data => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? data : todo));
      });
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Add todo</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <input
                type="text"
                value={todo.text}
                onChange={e => updateTodo(todo.id, e.target.value, todo.completed)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e => updateTodo(todo.id, todo.text, e.target.checked)}
            />
            <button onClick={() => setEditingId(editingId === todo.id ? null : todo.id)}>
              {editingId === todo.id ? 'Done' : 'Edit'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
