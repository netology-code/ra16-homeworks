import React from 'react';
import './App.css';
import List from './components/List';
import NewPost from './components/NewPost';
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import View from './components/View';
import Edit from './components/Edit'
import PostsProvider from './components/PostsProvider'

function App() {
  const [posts, setPosts] = useState()
  
  useEffect(() => {
    fetch('http://localhost:7777/posts')
    .then(resp => resp.json())
    .then(data => {
      setPosts(data);
    })
  }, [])
  
  return (
    <div className="App">
      <PostsProvider posts={posts}>
        <Router>
          <Route exact path='/posts/new' component={NewPost} />
          <Route exact path='/' component={List}/>
          <Route exact path='/posts/:id([0-9]+)' component={View} />
          <Route exact path='/edit/:id' component={Edit} />
        </Router>
      </PostsProvider>
    </div>
  );
}

export default App;
