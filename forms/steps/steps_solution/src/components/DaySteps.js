import React from 'react'
import PropTypes from 'prop-types'

function DaySteps(props) {
    return (
        <div className='day-wrap'>
            <div className='day'>
                <label htmlFor='name'>Дата (ДД. ММ. ГГ.)</label>
                <input />
            </div>
            <div className='day'>
                <label htmlFor='name'>Пройдено км</label>
                <input />
            </div>
            <button className='day'> OK </button>
        </div>
    )
}

DaySteps.propTypes = {

}

export default DaySteps


