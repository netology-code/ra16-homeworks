import React from 'react';
import './App.css';
import GetData from './components/GetData';
import GetError from './components/GetError';
import GetLoading from './components/GetLoading';

function App() {
  
  const urlData = 'http://localhost:7070/';
  const opts = {
    data: 'data', 
    error: 'error',
    loading: 'loading'
  }

  return (
    <div className="App">
      <GetData url={urlData} opts={opts.data}/>
      <GetError url={urlData} opts={opts.error}/>
      <GetLoading url={urlData} opts={opts.loading}/>      
    </div>
  );
}

export default App;
