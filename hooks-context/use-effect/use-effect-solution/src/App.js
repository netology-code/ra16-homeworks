import React from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import List from './components/List';
import Details from './components/Details';

function App() {
  const [list, setList] = useState([])
  const [info, setInfo] = useState({})

  function infoRequest(id, name) {
    setInfo({id, name})
  }
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
      .then(response => response.json())
      .then(data => {
        setList(data);
      })
  }, [])

  return (
    <div className="App">
      <List fullList={list} request={infoRequest} />
      {info.id ? <Details info={info} /> : null}
    </div>
  );
}

export default App;
