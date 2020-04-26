import React from 'react';
import './App.css';
import AddWatch from './components/AddWatch';
import WatchTable from './components/WatchTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {watches:[]};
    
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(data) {
    this.setState(state => {
      state.watches.push(data)
    })
  }

  render() {
    return (
      <div className="App">
        <AddWatch handleClick={this.handleClick}/>
        <WatchTable allWatches={this.state.watches}/>
        {console.log(this.state.watches)}
      </div>
    )
  }
}

export default App;
