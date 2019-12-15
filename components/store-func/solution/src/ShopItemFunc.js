import React from 'react'
import PropTypes from 'prop-types'

function ShopItemFunc(props) {
    const {item} = props;
    return (
        <div class="main-content">
            <h2>{item.brand}</h2>
            <h1>{item.title}</h1>
            <h3>{item.description}</h3>
            <div class="description">
                {item.descriptionFull}
            </div>
            <div class="highlight-window mobile"><div class="highlight-overlay"></div></div>
            <div class="divider"></div>
            <div class="purchase-info">
            <div class="price">{item.currency + item.price}</div>
                <button>Добавить в корзину</button>
            </div>
        </div>
    )
}

ShopItemFunc.propTypes = {
    item: PropTypes.object
};

export default ShopItemFunc;