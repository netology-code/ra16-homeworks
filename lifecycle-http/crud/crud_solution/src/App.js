import React from 'react';
import './App.css';
import Form from './components/Form'
import AllNotes from './components/AllNotes';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: []}
    this.sandNote = this.sandNote.bind(this)
    this.deletNote = this.deletNote.bind(this)
  }

  loadNotes = () => {
    fetch('http://localhost:7777/notes')
      .then(response => 
        response.json()
      )
      .then(note => {
        this.setState({text: note})
      })
  }

  sandNote(note) {
    fetch('http://localhost:7777/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'content': note
        })
    })
  }

  deletNote(id) {
    fetch(`http://localhost:7777/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 204){
        this.loadNotes()
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="wrap">
          <div className='update-button'>
            <span>Notes</span>
            <button className="update" onClick={this.loadNotes}></button>
          </div>
          <AllNotes notes={this.state.text} delet={this.deletNote}/>
          <Form addNote={this.sandNote} getNotes={this.loadNotes}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.loadNotes();
  }
}

export default App;
