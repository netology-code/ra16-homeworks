import "./App.css"
import ProductList from "./components/ProductList"
import TodoList from "./components/TodoList"
import UserManager from "./components/UserManager"

export const App = () => {
  return (
    <div className="App">
      <ProductList />
      <UserManager />
      <TodoList />
    </div>
  )
}
