import type React from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  clearError,
  toggleTodo,
} from "../features/todos/todosSlice"

const TodoList: React.FC = () => {
  const { todos, loading, error } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const [todoId, setTodoId] = useState<string>("")
  const [newTodoTitle, setNewTodoTitle] = useState<string>("")

  useEffect(() => {
    void dispatch(fetchTodos())
  }, [dispatch])

  const handleFetchTodo = async () => {
    if (todoId.trim()) {
      const result = await dispatch(fetchTodoById(Number(todoId)))

      if (fetchTodoById.fulfilled.match(result)) {
        console.log("Todo fetched successfully:", result.payload)
        setTodoId("")
      } else {
        console.error("Failed to fetch todo:", result.payload)
      }
    }
  }

  const handleCreateTodo = async () => {
    if (newTodoTitle.trim()) {
      const result = await dispatch(
        createTodo({
          title: newTodoTitle,
          completed: false,
          userId: 1,
        }),
      )

      if (createTodo.fulfilled.match(result)) {
        setNewTodoTitle("")
      }
    }
  }

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id))
  }

  if (loading && todos.length === 0) {
    return <div>Loading todos...</div>
  }

  return (
    <div>
      <h2>Todo List with Async Actions</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          Error: {error}
          <button
            onClick={() => dispatch(clearError())}
            style={{ marginLeft: "1rem" }}
          >
            Clear Error
          </button>
        </div>
      )}

      <div style={{ marginBottom: "2rem" }}>
        <h3>Fetch Specific Todo</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="number"
            value={todoId}
            onChange={e => {
              setTodoId(e.target.value)
            }}
            placeholder="Enter todo ID (1-200)"
            style={{ padding: "0.5rem" }}
          />
          <button
            onClick={() => {
              void handleFetchTodo()
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Todo"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Create New Todo</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={newTodoTitle}
            onChange={e => {
              setNewTodoTitle(e.target.value)
            }}
            placeholder="New todo title"
            style={{ padding: "0.5rem", minWidth: "200px" }}
          />
          <button
            onClick={() => {
              void handleCreateTodo()
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Todo"}
          </button>
        </div>
      </div>

      <h3>Todos ({todos.length})</h3>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {todos.slice(0, 20).map(todo => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
              border: "1px solid #eee",
              marginBottom: "0.25rem",
              cursor: "pointer",
              backgroundColor: todo.completed ? "#f0f8f0" : "white",
            }}
            onClick={() => {
              handleToggle(todo.id)
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              style={{ marginRight: "0.5rem" }}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#666" : "black",
              }}
            >
              #{todo.id}: {todo.title}
            </span>
            {todo.completed && <span style={{ marginLeft: "auto" }}>✅</span>}
          </div>
        ))}
      </div>
      {todos.length > 20 && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Showing first 20 todos of {todos.length}
        </p>
      )}
    </div>
  )
}

export default TodoList
