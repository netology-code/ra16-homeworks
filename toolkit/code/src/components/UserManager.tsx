import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { User } from "../features/users/usersSlice"
import {
  addUser,
  updateUser,
  removeUser,
  setRoleFilter,
  setSearchTerm,
  selectFilteredUsers,
  selectUsersByRole,
} from "../features/users/usersSlice"

const UserManager: React.FC = () => {
  const dispatch = useAppDispatch()
  const filteredUsers = useAppSelector(selectFilteredUsers)
  const adminUsers = useAppSelector(state => selectUsersByRole(state, "admin"))
  const { filters } = useAppSelector(state => state.users)

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user" | "moderator",
  })
  const [editingUser, setEditingUser] = useState<string | null>(null)

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      dispatch(
        addUser({
          id: crypto.randomUUID(),
          ...newUser,
        }),
      )
      setNewUser({ name: "", email: "", role: "user" })
    }
  }

  const handleUpdateUser = (id: string, updates: Partial<User>) => {
    dispatch(updateUser({ id, ...updates }))
    setEditingUser(null)
  }

  const handleRemoveUser = (id: string) => {
    dispatch(removeUser(id))
  }

  const handleRoleFilter = (role: string) => {
    const validRoles: Record<string, User["role"] | undefined> = {
      all: undefined,
      admin: "admin",
      moderator: "moderator",
      user: "user",
    }
    dispatch(setRoleFilter(validRoles[role]))
  }

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm))
  }

  return (
    <div>
      <h2>User Management</h2>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Add New User</h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={e => {
              setNewUser(prev => ({ ...prev, name: e.target.value }))
            }}
            style={{ padding: "0.5rem" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={e => {
              setNewUser(prev => ({ ...prev, email: e.target.value }))
            }}
            style={{ padding: "0.5rem" }}
          />
          <select
            value={newUser.role}
            onChange={e => {
              const role = e.target.value as User["role"]
              setNewUser(prev => ({ ...prev, role }))
            }}
            style={{ padding: "0.5rem" }}
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Filters</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div>
            <label>Search: </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={e => {
                handleSearch(e.target.value)
              }}
              placeholder="Search by name or email"
              style={{ padding: "0.5rem" }}
            />
          </div>
          <div>
            <label>Role: </label>
            <select
              value={filters.role ?? "all"}
              onChange={e => {
                handleRoleFilter(e.target.value)
              }}
              style={{ padding: "0.5rem" }}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <p>
          <strong>Admin Users Count:</strong> {adminUsers.length}
        </p>
        <p>
          <strong>Filtered Users Count:</strong> {filteredUsers.length}
        </p>
      </div>

      <h3>Users</h3>
      <div>
        {filteredUsers.map(user => (
          <div
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem",
              border: "1px solid #eee",
              marginBottom: "0.5rem",
              backgroundColor: user.role === "admin" ? "#fff3cd" : "white",
            }}
          >
            {editingUser === user.id ? (
              <EditUserForm
                user={user}
                onSave={updates => {
                  handleUpdateUser(user.id, updates)
                }}
                onCancel={() => {
                  setEditingUser(null)
                }}
              />
            ) : (
              <>
                <div>
                  <strong>{user.name}</strong> ({user.email})
                  <span
                    style={{
                      marginLeft: "1rem",
                      padding: "0.25rem 0.5rem",
                      backgroundColor: getRoleColor(user.role),
                      borderRadius: "3px",
                      fontSize: "0.8em",
                    }}
                  >
                    {user.role}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditingUser(user.id)
                    }}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveUser(user.id)
                    }}
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const EditUserForm: React.FC<{
  user: User
  onSave: (updates: Partial<User>) => void
  onCancel: () => void
}> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "0.5rem", width: "100%" }}
    >
      <input
        type="text"
        value={formData.name}
        onChange={e => {
          setFormData(prev => ({ ...prev, name: e.target.value }))
        }}
        style={{ padding: "0.5rem" }}
      />
      <input
        type="email"
        value={formData.email}
        onChange={e => {
          setFormData(prev => ({ ...prev, email: e.target.value }))
        }}
        style={{ padding: "0.5rem" }}
      />
      <select
        value={formData.role}
        onChange={e => {
          const role = e.target.value as User["role"]
          setFormData(prev => ({ ...prev, role }))
        }}
        style={{ padding: "0.5rem" }}
      >
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "#ffeeba"
    case "moderator":
      return "#bee5eb"
    case "user":
      return "#d4edda"
    default:
      return "#f8f9fa"
  }
}

export default UserManager
