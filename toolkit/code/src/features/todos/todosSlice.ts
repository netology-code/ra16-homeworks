import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Todo } from "../../api/todosAPI"
import { todosAPI } from "../../api/todosAPI"

type TodosState = {
  todos: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
}

// Асинхронные thunk'и
export const fetchTodos = createAsyncThunk<
  Todo[], // возвращаемый тип
  undefined, // тип аргумента
  { rejectValue: string } // тип для reject
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    return await todosAPI.fetchTodos()
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error",
    )
  }
})

export const fetchTodoById = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string }
>("todos/fetchById", async (todoId, { rejectWithValue }) => {
  try {
    return await todosAPI.fetchTodoById(todoId)
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Network error",
    )
  }
})

export const createTodo = createAsyncThunk<
  Todo,
  Omit<Todo, "id">,
  { rejectValue: string }
>("todos/createTodo", async (todoData, { rejectWithValue }) => {
  try {
    return await todosAPI.createTodo(todoData)
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to create todo",
    )
  }
})

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? "Failed to fetch todos"
      })

      // Fetch todo by ID
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        const existingIndex = state.todos.findIndex(
          todo => todo.id === action.payload.id,
        )
        if (existingIndex !== -1) {
          state.todos[existingIndex] = action.payload
        } else {
          state.todos.push(action.payload)
        }
      })

      // Create todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })
  },
})

export const { clearError, toggleTodo } = todosSlice.actions
export default todosSlice.reducer
