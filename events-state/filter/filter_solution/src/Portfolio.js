import React, { PureComponent } from 'react'
import Toolbar from './Toolbar';
import ProjectList from './ProjectList';

export class Portfolio extends PureComponent {
    static propTypes = {}
    constructor(props) {
        super(props);
        this.state = {
            filters: ["All", "Websites", "Flayers", "Business Cards"], 
            selected: 'All',
            projects: 
                [{
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/mon.jpg",
                    category: "Business Cards"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/200.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/emi_haze.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/codystretch.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/Triangle_003.jpg",
                    category: "Business Cards"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290.png",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/200.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/transmission.jpg",
                    category: "Business Cards"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290_1.png",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290_2.png",
                    category: "Flayers"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/the_ninetys_brand.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/dia.jpg",
                    category: "Business Cards"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/Triangle_350x197.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/emi_haze.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/transmission.jpg",
                    category: "Business Cards"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/Triangle_350x197_1.jpg",
                    category: "Websites"
                  }, {
                    img: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/events-state/filter/img/place200x290_3.png",
                    category: "Flayers"
                  }]
        };
        this.onSelectFilter = this.onSelectFilter.bind(this);
    }
    
    onSelectFilter(evt) {
        this.setState({selected: evt})
        console.log(evt);
    }

    render() {
        return (
            <div className='wrap'>
                <div>
                    {this.state.filters.map(o => <Toolbar filter={o} selected={this.state.selected} onChangeSelected={this.onSelectFilter} />)}  
                </div>
                <ProjectList projects={this.state.selected === 'All' ? this.state.projects : this.state.projects.filter(el => el.category === this.state.selected)} />                    
            </div>
        )
    }
}

export default Portfolio;
