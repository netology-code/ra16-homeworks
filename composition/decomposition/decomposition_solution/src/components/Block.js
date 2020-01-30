import React from 'react'
import PropTypes from 'prop-types'

function Block(props) {
    return (
        <div className={props.class}>
            {props.children}
        </div>
    )
}

Block.propTypes = {

}

export default Block

