import React from 'react'
import PropTypes from 'prop-types'

function Calendar(props) {
    
    const {date} = props;

    return (
        <div>
            <h1>
                {date.getDay()}
            </h1>
        </div>
    )
}

Calendar.propTypes = {
    date: PropTypes.object
}

export default Calendar;