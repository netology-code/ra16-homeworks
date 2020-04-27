import React from 'react';

class WatchTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            currentWatches: this.props.allWatches
        }
    }

    render() {
    // const currentWatches = this.props.allWatches.map(el => <li>{el.name}</li>)
        return(
            <div>
                <ul>
                    {this.state.currentWatches.map(el => <li>{el.name}</li>)}
                </ul>
                <p>{this.state.count}</p>
            </div>
        )
    }

    componentDidMount() {
    //    this.interval = setInterval(() => {   
    //     this.setState(state => {
    //         state.count = state.count + 1
    //     })
    //    }, 1000)
    }
}

export default WatchTable