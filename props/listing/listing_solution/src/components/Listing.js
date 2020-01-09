import React from 'react'
import PropTypes from 'prop-types'

function Listing(props) {
    console.log(props.items[0].MainImage.url_570xN);

    const itemsList = props.items.map(item => (
        <div className="item">
            <div className="item-image">
              <a href={item.url}>
                <img src={item.state === 'active' ? item.MainImage.url_570xN : ''} alt={item.title}/>
              </a>
            </div>
            <div className="item-details">
                <p className="item-title">{item.title}</p>
                <p className="item-price"></p>
                <p className="item-quantity level-medium"></p>
            </div>
        </div>
    ));

    return (
        <div>
            <h1>Hello!</h1>
            {itemsList}
        </div>
    )
}

Listing.propTypes = {

}

export default Listing

