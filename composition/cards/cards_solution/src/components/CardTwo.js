import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card';

function CardTwo(props) {
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, quidem. Sequi harum atque alias placeat hic pariatur quis voluptas, perferendis quibusdam est aliquam dolor quidem ea deserunt culpa maxime assumenda!';
    const title = 'Special Offer'
    return (
        <div className="card" style={{width: '18rem'}}>
            <Card text={text} title={title}/> 
        </div>
    )
}

CardTwo.propTypes = {

}

export default CardTwo

