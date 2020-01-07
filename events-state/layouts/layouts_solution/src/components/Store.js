import React, { PureComponent } from 'react'
import CardsView from './CardsView'
import IconSwittch from './IconSwittch';
import ListView from './ListView';

export class Store extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'view_list',
            products: 
                [{
                    name: "Nike Metcon 2",
                    price: "130",
                    color: "red",
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/layouts/img/1.jpg"
                }, {
                    name: "Nike Metcon 2",
                    price: "130",
                    color: "green",
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/layouts/img/2.jpg"
                }, {
                    name: "Nike Metcon 2",
                    price: "130",
                    color: "blue",
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/layouts/img/3.jpg"
                }, {
                    name: "Nike Metcon 2",
                    price: "130",
                    color: "black",
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/layouts/img/4.jpg"
                }, {
                    name: "Nike free run",
                    price: "170",
                    color: "black",
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/layouts/img/7.jpg"
                }, {
                    name: "Nike Metcon 3",
                    price: "150",
                    color: "green",
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/layouts/img/5.jpg"
                }]
        };
    }

    handleSwitch = evt => {
        this.setState(() => {
            if(evt === 'view_list') {
                return {icon: 'view_module'};
            } else {
                return {icon: 'view_list'};
            }
        })
    };

    render() {
        return (
            <div className='wrap'>
                <IconSwittch name={this.state.icon} onSwitch={this.handleSwitch}/>
                {this.state.icon === 'view_list' ? <CardsView cards={this.state.products} /> : <ListView items={this.state.products}/>}
            </div>
        )
    }
}

export default Store;
