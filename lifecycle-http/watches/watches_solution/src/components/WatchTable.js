import React from 'react';
// import moment from 'moment';
// import '../Clock.css'
// import ClockModel from './ClockModel';

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
        console.log(this.props.id)
        return(
            <li className='watch' key={this.props.id}>
            <p className='watch-name'>{this.props.country}</p>
            <p className='watch-mode'>
                <span>{this.state.hours + +this.props.timeZone}</span>
                :<span>{this.state.minutes}</span>
                :<span>{this.state.seconds < 10 ? '0' + `${this.state.seconds}` : this.state.seconds}</span>
            </p>
            <button onClick={() => this.handleRemove(this.props.id)}>✘</button>
        </li>
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

    componentDidUpdate(prevState) {
    //    if(this.state.seconds === 30) {
    //         clearInterval(this.interval)
    //    }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
}

export default WatchTable