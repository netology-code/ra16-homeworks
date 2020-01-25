import React from 'react'
import PropTypes from 'prop-types'

function Card(props) {
    return (
        <div className="card-body">
            <h5 className="card-title">{props.title ? props.title : undefined}</h5>
            <p className="card-text">
                {props.text ? props.text : undefined}
            </p>
            <a href="google.com" className="btn btn-primary">Go somewhere</a>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string
}

export default Card

