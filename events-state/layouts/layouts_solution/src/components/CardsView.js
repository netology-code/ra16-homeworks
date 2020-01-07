import React from 'react'
import ShopCard from './ShopCard';
import PropTypes from 'prop-types'

function CardsView(props) {
    console.log(props.products);
    return (
        <div className='cards'>
            {props.cards.map((el, index) => <ShopCard product={el} key={index}/>)}
        </div>
    )
}

CardsView.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        img: PropTypes.string,
        color: PropTypes.string,
        price: PropTypes.string
    }))
}

export default CardsView;

