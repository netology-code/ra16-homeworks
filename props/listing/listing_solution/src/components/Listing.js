import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Listing(props) {

    const itemView = (item) => {
        
        if(item.state === 'active') {
            let shotTitle = Array.from(item.title)
            shotTitle = shotTitle.length > 50 ? shotTitle.slice(0, 50).join('') + '...' : shotTitle.join('');

            return  <div className='item' key={item.listing_id}>
                        <div className="item-image">
                        <a href={item.url}>
                            <img src={item.state === 'active' ? item.MainImage.url_570xN : ''} alt={item.title}/>
                        </a>
                        </div>
                        <div className="item-details">
                            <p className="item-title">{shotTitle}</p>
                            <p className="item-price">{item.price}</p>
                            <p className={`item-quantity level-${item.quantity <= 10 ? 'low' : item.quantity <= 20 ? 'medium' : 'high'}`}>{item.quantity}</p>
                        </div>
                    </div>
        }
    }

    const itemsList = props.items.map(item => itemView(item));

    return (
        <Fragment>
            {itemsList}
        </Fragment>
        
    )
}

Listing.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        listing_id: PropTypes.number,
        url: PropTypes.string,
        MainImage: PropTypes.object, 
        title: PropTypes.string,
        currency_code: PropTypes.string,
        price: PropTypes.string,
        quantity: PropTypes.number
    }))
}

export default Listing

