import React, { PureComponent } from 'react'
import CardsView from './CardsView'

export class Store extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <CardsView />
            </div>
        )
    }
}

export default Store;
