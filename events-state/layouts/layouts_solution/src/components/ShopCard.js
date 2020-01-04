import React from 'react'
import PropTypes from 'prop-types'

function ShopCard(props) {
    return (
        <div className='card card-product'>
            <div className='card'>
                <h1>
                    {props.product.name}
                </h1>
                <span>
                    {props.product.color}
                </span>
            </div>
            <img className='card card-image' src={props.product.img} alt={props.product.name}/>
            <div className='card'>
                <span>
                    {props.product.price}
                </span>
                <button>Add to card</button>
            </div>
        </div>
    )
}

ShopCard.propTypes = {

}

export default ShopCard

