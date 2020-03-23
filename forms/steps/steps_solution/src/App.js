import React from 'react';
import './App.css';
import {useState} from 'react';
import DayModel from './components/DayModel';
import nanoid from 'nanoid';
import WrapForm from './components/WrapForm';
import List from './components/List';

function App() {
  const baseForm = {
    date: '',
    distance: ''
  };
  const [form, setForm] = useState({
      date: '',
      distance: ''
  });
  const [days, setDays] = useState([]);

  const handleChange = evt => {
      const {name, value} = evt.target;
      setForm(prevForm => ({...prevForm, [name]: value}));
  }

  const handleForm = evt => {
      evt.preventDefault();
      const checkDay = days.filter(day => day.date === form.date);

      if(checkDay.length > 0) {
          const day = new DayModel(nanoid(), checkDay[0].date, `${+form.distance + +checkDay[0].distance}`);
          handleRemove(checkDay[0].id);
          setDays(prevDays => [...prevDays, day]);
      } else {
          const day = new DayModel(nanoid(), form.date, form.distance);
          setDays(prevDays => [...prevDays, day]);
      }

      setForm(baseForm);
  }

  const handleRemove = id => {
      setDays(prevDays => prevDays.filter(day => day.id !== id))
  }

  return (
    <div className="App">
      <WrapForm date={form.date} distance={form.distance} onSubmit={handleForm} onChange={handleChange}/>
      <List listDays={days} onRemove={handleRemove}/>
    </div>
  );
}

export default App;
