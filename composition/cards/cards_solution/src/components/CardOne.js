import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

function CardOne(props) {
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni id accusamus voluptatem nam autem excepturi dolores totam quisquam.';
    const title = 'Hello, React!'
    return (
        <div className="card" style={{width: '18rem'}}>
            <img src="https://www.filepicker.io/api/file/SVFQZQAyRpqJ31f6LNGe" className="card-img-top" alt="React-logo" />
            <Card text={text} title={title}/>
        </div>
    )
}

CardOne.propTypes = {

}

export default CardOne

