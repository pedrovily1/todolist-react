import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';

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
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
        )}
      </div>
      <div className="todo-actions">

        <label className="checkbox-container">
        <input
          type="checkbox"
          className="checkmark"
          checked={todo.completed}
          onChange={e => updateTodo(todo.id, todo.text, e.target.checked)}
        />
        </label>
        
            <IconButton className='Edit' onClick={() => setEditingId(editingId === todo.id ? null : todo.id)} >
            {editingId === todo.id ?   <DoneIcon/> : <CreateIcon/>}
            </IconButton>

            <link
             rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
       
           
      <IconButton  className="Delete" aria-label="delete" size="large" onClick={() => deleteTodo(todo.id)}>
        <DeleteIcon />
      </IconButton>
      
       </div>
    </li>
  );
}

export default TodoItem;
