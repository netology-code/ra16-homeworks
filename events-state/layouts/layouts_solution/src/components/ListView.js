import React from 'react'
import PropTypes from 'prop-types'
import ShopItem from './ShopItem';

function ListView(props) {
    return (
        <div className='item'>
            {props.items.map((el, index) => <ShopItem product={el} key={index}/>)}
        </div>
    )
}

ListView.propTypes = {

}

export default ListView;

