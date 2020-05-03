import React from 'react';
import './App.css';
import AddWatch from './components/AddWatch';
import WatchTable from './components/WatchTable';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {watches: []}
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleClick(data, id) {
    data.id = id;
    this.setState({watches: [...this.state.watches, data]})
  }

  handleRemove(id) {
    this.setState({watches: this.state.watches.filter(watch => watch.id !== id)})
  }

  render() {
    return (
      <div className="App">
        <AddWatch handleClick={this.handleClick}/>
        <div>
          <ul>
            {this.state.watches.map(el => <li key={el.id} className='watch'><WatchTable country={el.name} timeZone={el.timeZone} onRemove={this.handleRemove} id={el.id}/></li>)}
          </ul>
        </div>
      </div>
    ) 
  }
}

export default App;
