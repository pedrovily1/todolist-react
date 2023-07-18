import React, { useState, useEffect } from 'react';
import './index.css';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { BarWave } from 'react-cssfx-loading';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingMessages = ['Creating todos', 'Reading them', 'Ready!']; // Add more loading messages here

  useEffect(() => {
    fetch('/api/todos/')
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setTodos(data);
          setIsLoading(false);
        }, 4000);
      });
  }, []);

  function addTodo() {
    const newTodo = { text: newTodoText };

    fetch('/api/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]);
        setNewTodoText('');
      });
  }

  function deleteTodo(id) {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? data : todo))
        );
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex((prevIndex) =>
        (prevIndex + 1) % loadingMessages.length
      );
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="todo-container">
      <SwitchTransition>
        <CSSTransition
          key={isLoading ? 'Loading' : 'App'}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames="fade"
        >
          {isLoading ? (
            <div className="loading-container">
              <BarWave className="loading-animation" />
              <p className="loading-message">
                {loadingMessages[loadingMessageIndex]}
              </p>
            </div>
          ) : (
            <>
              <h1>Things I need to do</h1>
              <TodoInput
                newTodoText={newTodoText}
                setNewTodoText={setNewTodoText}
                addTodo={addTodo}
              />
              <TodoList
                todos={todos}
                editingId={editingId}
                setEditingId={setEditingId}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            </>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
