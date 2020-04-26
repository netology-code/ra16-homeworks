import React from 'react';

class AddWatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            timeZone: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.handleClick(this.state);
        this.setState({
            name: '',
            timeZone: ''
        })
        event.preventDefault();
    }

    render() {
        console.log(this.state)
        return(
            <form className='add-block' onSubmit={this.handleSubmit}>
                <div className='wrap'>
                    <label>Название</label>
                    <input name='name' value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className='wrap'>
                    <label>Временная зона</label>
                    <input name='timeZone' value={this.state.timeZone} onChange={this.handleChange}/>
                </div>
                <button type='submit'>Добавить</button>
            </form>
        )
    }
}

export default AddWatch