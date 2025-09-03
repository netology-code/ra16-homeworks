export type Todo = {
  id: number
  title: string
  completed: boolean
  userId: number
}

export const todosAPI = {
  fetchTodos: async (): Promise<Todo[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    if (!response.ok) {
      throw new Error("Failed to fetch todos")
    }
    return response.json() as Promise<Todo[]>
  },

  fetchTodoById: async (id: number): Promise<Todo> => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${String(id)}`,
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch todo ${String(id)}`)
    }
    return response.json() as Promise<Todo>
  },

  createTodo: async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
    return response.json() as Promise<Todo>
  },
}
