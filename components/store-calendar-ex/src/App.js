import './App.css';
import './css/main.css';
import Calendar from './Calendar';

function App() {
  const now = new Date(2017, 2, 8);

  // внутри компонента App:
  return (
    <Calendar now={now} />
  );
  }

export default App;
