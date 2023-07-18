import React from 'react';

function TodoItem({ todo, editingId, setEditingId, updateTodo, deleteTodo }) {
  return (
    <li key={todo.id} className="todo-item">
      <div className="todo-content">
        {editingId === todo.id ? (
          <input
            type="text"
            value={todo.text}
            onChange={e => updateTodo(todo.id, e.target.value, todo.completed)}
          />
        ) : (
          <span>{todo.text}</span>
        )}
      </div>
      <div className="todo-actions">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={e => updateTodo(todo.id, todo.text, e.target.checked)}
        />
        <div className="todo-buttons">
          <button onClick={() => setEditingId(editingId === todo.id ? null : todo.id)}>
            {editingId === todo.id ? 'Done' : 'Edit'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
