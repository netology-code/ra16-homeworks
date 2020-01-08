import React from 'react'
import PropTypes from 'prop-types'
import Star from './Star'

function Stars(props) {
    const count = typeof props.count === 'number' ? props.count : 0;
    const arrayStars =  [...Array(count)];

    return (
        <ul className='card-body-stars u-clearfix'>
            {
              arrayStars.length > 5 ? undefined : arrayStars.map((el, index) => <li key={index}><Star /></li>)
            }
        </ul>
        
    )
}

Stars.defaultProps = {
    count: 0
}

Stars.propTypes = {
    count: PropTypes.number
}

export default Stars

