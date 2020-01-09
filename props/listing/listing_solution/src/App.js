import React from 'react';
import './App.css';
import Data from './data/etsy.json';
import Listing from './components/Listing';

const data = Data;

function App() {
  return (
    <div className="App">
      <Listing items={data}/>    
    </div>
  );
}

export default App;
