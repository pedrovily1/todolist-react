import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, editingId, setEditingId, updateTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          setEditingId={setEditingId}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
