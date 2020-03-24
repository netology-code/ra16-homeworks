import React from 'react';
import './App.css';
import {useState} from 'react';
import WrapForm from './components/WrapForm';
import List from './components/List';

function App() {
  
  const [days, setDays] = useState([]);

  const handleSetDaysList = (day) => {
    setDays(prevDays => [...prevDays, day]);
  }

  const handleRemove = id => {
      setDays(prevDays => prevDays.filter(day => day.id !== id))
  }

  return (
    <div className="App">
      <WrapForm listDays={days} onRemove={handleRemove} onSubmit={handleSetDaysList}/>
      <List listDays={days} onRemove={handleRemove}/>
    </div>
  );
}

export default App;
