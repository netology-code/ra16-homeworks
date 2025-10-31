import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createSelector } from "@reduxjs/toolkit"

export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "moderator"
}

type UsersState = {
  entities: Record<string, User>
  ids: string[]
  filters: {
    role?: User["role"]
    searchTerm: string
  }
}

const initialState: UsersState = {
  entities: {
    "1": {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    },
    "2": {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
    },
    "3": {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "moderator",
    },
  },
  ids: ["1", "2", "3"],
  filters: {
    searchTerm: "",
  },
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.entities[user.id] = user
      state.ids.push(user.id)
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<User> & { id: string }>,
    ) => {
      const { id, ...updates } = action.payload
      const existingUser = state.entities[id]
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (existingUser) {
        Object.assign(existingUser, updates)
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const id = action.payload
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.entities[id]
      state.ids = state.ids.filter(userId => userId !== id)
    },
    setRoleFilter: (state, action: PayloadAction<User["role"] | undefined>) => {
      state.filters.role = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload
    },
  },
})

// Типизированные селекторы с мемоизацией
export const selectUsers = (state: { users: UsersState }) => state.users
export const selectAllUsers = (state: { users: UsersState }) =>
  state.users.ids.map(id => state.users.entities[id])

export const selectFilteredUsers = createSelector(
  [selectAllUsers, (state: { users: UsersState }) => state.users.filters],
  (users, filters) => {
    return users.filter(user => {
      const matchesRole = !filters.role || user.role === filters.role
      const matchesSearch =
        !filters.searchTerm ||
        user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase())

      return matchesRole && matchesSearch
    })
  },
)

export const selectUserById = createSelector(
  [selectUsers, (_: { users: UsersState }, userId: string) => userId],
  (usersState, userId) => usersState.entities[userId],
)

export const selectUsersByRole = createSelector(
  [selectAllUsers, (_: { users: UsersState }, role: User["role"]) => role],
  (users, role) => users.filter(user => user.role === role),
)

export const { addUser, updateUser, removeUser, setRoleFilter, setSearchTerm } =
  usersSlice.actions
export default usersSlice.reducer
