import React from 'react'
import PropTypes from 'prop-types'

function ListDaysSteps(props) {
    const date = props.data.date;
    const distance = props.data.distance;

    console.log(props)
    
    return (
        <div>
            <p>
                {date}
            </p>
            <p>
                {distance}
            </p>        
        </div>
    )
}

ListDaysSteps.propTypes = {

}

export default ListDaysSteps

