import React, { PureComponent } from 'react'
import CardsView from './CardsView'

export class Store extends PureComponent {
    render() {
        return (
            <div>
                <CardsView />
            </div>
        )
    }
}

export default Store;
