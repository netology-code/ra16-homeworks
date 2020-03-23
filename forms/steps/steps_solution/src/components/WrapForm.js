import React from 'react'
import PropTypes from 'prop-types'

function WrapForm(props) {

    const date=props.date;
    const distance= props.distance;
    
    const handleChange = (evt) => {
        return props.onChange(evt)
    }

    const handleForm = (evt) => {
        return props.onSubmit(evt)
    }

    return (
        <form className='input-form' onSubmit={handleForm}>
        <div className='input-wrap'>
            <div className='day'>
                <label htmlFor='name'>Дата (ДД. ММ. ГГ.)</label>
                <input name='date' value={date} onChange={handleChange}/>
            </div>
            <div className='day'>
                <label htmlFor='name'>Пройдено км</label>
                <input name='distance' value={distance} onChange={handleChange}/>
            </div>
            <button className='day submit-btn'> OK </button>
        </div>
        </form>
    )
}

WrapForm.propTypes = {

}

export default WrapForm

