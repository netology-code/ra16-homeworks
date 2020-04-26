import React from 'react';
import './App.css';
import AddWatch from './components/AddWatch';
import WatchTable from './components/WatchTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        name: '',
        timeZone: 0
      }
    ]
    
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault();
    this.setState(state => {
      state.push(this.state)
    })
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <AddWatch handleClick={this.handleClick}/>
        <WatchTable />
      </div>
    )
  }
}

export default App;
