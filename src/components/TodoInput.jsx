import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
 
function TodoInput({ newTodoText, setNewTodoText, addTodo }) {
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
          addTodo();
        }
    }
    
  return (
    <div className="input-group">
      <input
        type="text" 
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
        onKeyPress={handleKeyPress}
        id='ip2'     
      />
 
       <AddCircleIcon onClick={addTodo} id='Circle' />
 
       <link
         rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </div>
  );
}

export default TodoInput;
