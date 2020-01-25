import React from 'react'
import PropTypes from 'prop-types'

function Card(props) {
    return (
        // <div className="card" style={{width: '18rem'}}>
        //     {props.img ? props.img : undefined}
            <div className="card-body">
                <h5 className="card-title">{props.title ? props.title : undefined}</h5>
                <p className="card-text">
                    {props.text ? props.text : undefined}
                </p>
                <a href="google.com" className="btn btn-primary">Go somewhere</a>
            </div>
        // </div>
    )
}

Card.propTypes = {

}

export default Card

