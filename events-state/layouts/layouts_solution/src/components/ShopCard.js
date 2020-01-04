import React from 'react'
import PropTypes from 'prop-types'

function ShopCard(props) {
    console.log(props)
    return (
        <div className='card-product'>
            <h1>
                {props.product.name}
            </h1>
            <span>
                {props.product.color}
            </span>
            <img className='card-image' src={props.product.img} />
            <span>
                {props.product.price}
            </span>
            <button>Add to card</button>
        </div>
    )
}

ShopCard.propTypes = {

}

export default ShopCard

