import React from 'react'
import PropTypes from 'prop-types'

function ShopItem(props) {
    return (
        <div className='item-product'>
            <img className='item item-image' src={props.product.img} alt={props.product.name}/>
            <h1 className='item'>
                {props.product.name}
            </h1>
            <span className='item'>
                {props.product.color}
            </span>
            <span className='item'>
                {props.product.price}
            </span>
            <button>Add to card</button>
        </div>
    )
}

ShopItem.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    color: PropTypes.string,
    price: PropTypes.string
}

export default ShopItem

