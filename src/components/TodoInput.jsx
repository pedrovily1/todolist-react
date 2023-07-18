import React from 'react';

function TodoInput({ newTodoText, setNewTodoText, addTodo }) {
  return (
    <div className="input-group">
      <input
        type="text"
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Add todo</button>
    </div>
  );
}

export default TodoInput;
