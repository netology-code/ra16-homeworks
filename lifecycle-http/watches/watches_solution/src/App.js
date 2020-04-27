import React, {useState} from 'react';
import './App.css';
import AddWatch from './components/AddWatch';
import WatchTable from './components/WatchTable';

function App() {

  const [watches, setWatches] = useState([])

  const  handleClick = (data) => {
      setWatches(watch => [...watch, data])
  }

  return (
    <div className="App">
      <AddWatch handleClick={handleClick}/>
      <WatchTable allWatches={watches}/>
    </div>
  )
}

export default App;
