import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(t => t.id !== id)
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <p>
        <label htmlFor="new-task">Add Item</label>
        <input id="new-task" ref={todoNameRef} type="text" />
        <button className="add" onClick={handleAddTodo}>Add</button>
      </p>

      <h3>Todo</h3>
      <ul id="incomplete-tasks">
        <TodoList todos={todos.filter(todo => !todo.complete)} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </ul>

      <h3>Completed</h3> 
      <ul id="completed-tasks">
        <TodoList todos={todos.filter(todo => todo.complete)} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </ul>

      <button onClick={handleClearTodo}>Clear</button>
    </div>
  )
}

export default App;
