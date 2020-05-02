import React from 'react';
import './App.css';
import './Clock.css';
import AddWatch from './components/AddWatch';
import WatchTable from './components/WatchTable';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {watches: []}
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  // const [watches, setWatches] = useState([])

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
            {this.state.watches.map(el => <WatchTable id={el.id} country={el.name} timeZone={el.timeZone} onRemove={this.handleRemove}/>)}
          </ul>
        </div>
        {/* <WatchTable allWatches={this.state.watches} onRemove={this.handleRemove}/> */}
      </div>
    ) 
  }
}

export default App;
