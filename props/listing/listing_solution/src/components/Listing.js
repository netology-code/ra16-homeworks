import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Listing(props) {

    const itemsList = props.items.map(item => (
        <div className='item'>
            <div className="item-image">
              <a href={item.url}>
                <img src={item.state === 'active' ? item.MainImage.url_570xN : ''} alt={item.title}/>
              </a>
            </div>
            <div className="item-details">
                {console.log(item.title)}
                <p className="item-title">{item.title}</p>
                <p className="item-price">{item.price}</p>
                <p className={`item-quantity level-${item.quantity <= 10 ? 'low' : item.quantity <= 20 ? 'medium' : 'high'}`}>{item.quantity}</p>
            </div>
        </div>
    ));

    return (
        <Fragment>
            {itemsList}
        </Fragment>
        
    )
}

Listing.propTypes = {

}

export default Listing

