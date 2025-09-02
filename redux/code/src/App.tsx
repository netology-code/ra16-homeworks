import ServiceList from './components/ServiceList'
import ServiceAdd from './components/ServiceAdd'
import './App.css'

function App() {
  return (
    <div>
      <h1>Управление услугами</h1>
      <ServiceAdd />
      <ServiceList />
    </div>
  )
}

export default App
