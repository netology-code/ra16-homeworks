import React from 'react';

class WatchTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hours: '',
            minutes: '',
            seconds: ''
        }

        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove(id) {
        this.props.onRemove(id);
    }
    
    render() {
        return(
            <div>
                <p className='watch-name'>{this.props.country}</p>
                <p className='watch-mode'>
                    <span>{this.state.hours + +this.props.timeZone < 10 ? '0' + `${this.state.hours + +this.props.timeZone}` : this.state.hours + +this.props.timeZone} :</span>
                    <span>{this.state.minutes < 10 ? '0' + `${this.state.minutes}` : this.state.minutes} :</span>
                    <span>{this.state.seconds < 10 ? '0' + `${this.state.seconds}` : this.state.seconds}</span>
                </p>
                <button onClick={() => this.handleRemove(this.props.id)}>✘</button>
            </div>
        )
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const currentTime = new Date();
            this.setState({
                hours: currentTime.getHours() + currentTime.getTimezoneOffset()/60,
                minutes: currentTime.getMinutes(),
                seconds: currentTime.getSeconds()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
}

export default WatchTable