import React from 'react';
import './App.css';
import List from './components/List';
import NewPost from './components/NewPost';
import { BrowserRouter as Router, Route } from "react-router-dom"
import View from './components/View';

function App() {
  return (
    <div className="App">
    <Router>
        <Route exact path='/posts/new' component={NewPost} />
        <Route exact path='/' component={List} />
        <Route exact path='/posts/view' component={View} />
    </Router>
      
    </div>
  );
}

export default App;
