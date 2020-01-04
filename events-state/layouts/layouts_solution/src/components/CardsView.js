import React from 'react'
import ShopCard from './ShopCard';
// import PropTypes from 'prop-types'

function CardsView(props) {
    console.log(props.products);
    return (
        <div className='cards'>
            {props.products.map((el, index) => <ShopCard product={el} key={index}/>)}
        </div>
    )
}

// CardsView.propTypes = {

// }

export default CardsView;

