import React from 'react';
import './App.css';
import DayModel from './components/DayModel';
import nanoid from 'nanoid';
import {useState} from 'react';
import WrapForm from './components/WrapForm';
import List from './components/List';

function App() {
  
  const [days, setDays] = useState([]);

  const handleForm = (evt, date, distance, days) => {
    evt.preventDefault();
    const checkDay = days.filter(day => day.date === date);

    if(checkDay.length > 0) {
        const day = new DayModel(nanoid(), checkDay[0].date, `${+distance + +checkDay[0].distance}`);
        handleRemove(checkDay[0].id);
        setDays(prevDays => [...prevDays, day]);
    } else {
        const day = new DayModel(nanoid(), date, distance);
        setDays(prevDays => [...prevDays, day]);
    }
  }

  const handleRemove = id => {
      setDays(prevDays => prevDays.filter(day => day.id !== id))
  }

  return (
    <div className="App">
      <WrapForm listDays={days} onRemove={handleRemove} onSubmit={handleForm}/>
      <List listDays={days} onRemove={handleRemove}/>
    </div>
  );
}

export default App;
