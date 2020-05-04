import React from 'react';
import './App.css';
import Form from './components/Form'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: []}
  }

  loadNotes = () => {
    fetch(process.env.REACT_APP_NOTES_URL)
      .then(response => console.log(response))
      // .then(note => {
      //   console.log(note)
      // })
  }

  render() {
    return (
      <div className="App">
        <div>{this.state.text.map(el => <p>{el}</p>)}</div>
        <Form />
      </div>
    )
  }

  componentDidMount() {
    this.loadNotes();
  }
}

export default App;
