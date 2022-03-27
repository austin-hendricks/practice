import React from 'react'

export default function Todo({ todo, toggleTodo, deleteTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function handleDelete() {
        deleteTodo(todo.id)
    }

    return (
        <li>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            <label>
                {todo.name}
            </label>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </li>
    )
}
