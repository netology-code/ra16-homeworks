import { useState } from 'react'
import './App.css'
import { ModalEvolutionDemo } from './components/ModalEvolution'
import { TypeScriptDemo } from './components/TypeScriptExamples'
import { PropsForwardingDemo } from './components/PropsForwarding'
import { SidebarDemo } from './components/SidebarExample'
import { AdvancedPatternsDemo } from './components/AdvancedPatterns'
import { PracticalExamplesDemo } from './components/PracticalExamples'

function App() {
  const [activeDemo, setActiveDemo] = useState<string>('modal-evolution')

  const demos = [
    { key: 'modal-evolution', title: '1. Эволюция компонента Modal', component: <ModalEvolutionDemo /> },
    { key: 'typescript', title: '2. Типизация children в TypeScript', component: <TypeScriptDemo /> },
    { key: 'props-forwarding', title: '3. Props Forwarding', component: <PropsForwardingDemo /> },
    { key: 'sidebar', title: '4. Sidebar с виджетами (SRP)', component: <SidebarDemo /> },
    { key: 'advanced', title: '5. Продвинутые паттерны', component: <AdvancedPatternsDemo /> },
    { key: 'practical', title: '6. Практические примеры', component: <PracticalExamplesDemo /> }
  ]

  const currentDemo = demos.find(demo => demo.key === activeDemo)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Композиция компонентов в React</h1>
        <p className="subtitle">Примеры кода</p>
      </header>

      <nav className="demo-nav">
        {demos.map(demo => (
          <button
            key={demo.key}
            className={`nav-button ${activeDemo === demo.key ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.key)}
          >
            {demo.title}
          </button>
        ))}
      </nav>

      <main className="demo-content">
        {currentDemo?.component}
      </main>

      <footer className="app-footer">
        <p>
          Эти примеры созданы для курса по react в netology.ru
        </p>
      </footer>
    </div>
  )
}

export default App
