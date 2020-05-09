import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {note: ''}
        this.handleChange = this.handleChange.bind(this)
        this.hanldeSubmit = this.hanldeSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(evt) {
        const note = evt.target.value;
        this.setState({note})
    }

    hanldeSubmit(event) {
        this.props.getNotes();
        event.preventDefault()
    }

    handleClick() {
        this.props.addNote(this.state.note);
        this.setState({note: ''})
    }

    render() {  
        return(
            <form onSubmit={this.hanldeSubmit}>
                <div className='form'>
                    <textarea className='input-note' cols='30' rows='6' value={this.state.note} onChange={this.handleChange}/>
                    <button className='send-note' onClick={this.handleClick}>GO</button>
                </div>
                
            </form>
        )
    }
}

export default Form;
