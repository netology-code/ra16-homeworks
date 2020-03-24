import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react'

function WrapForm(props) {
    const baseForm = {
        date: '',
        distance: ''
    };
    const [form, setForm] = useState({
        date: '',
        distance: ''
    });
    
    const days = props.listDays;

    const handleForm = (evt) => {
        const date = form.date;
        const distance = form.distance;
        props.onSubmit(evt, date, distance, days);
        setForm(baseForm);
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }
  
    return (
        <form className='input-form' onSubmit={handleForm}>
        <div className='input-wrap'>
            <div className='day'>
                <label htmlFor='name'>Дата (ДД. ММ. ГГ.)</label>
                <input name='date' value={form.date} onChange={handleChange}/>
            </div>
            <div className='day'>
                <label htmlFor='name'>Пройдено км</label>
                <input name='distance' value={form.distance} onChange={handleChange}/>
            </div>
            <button className='day submit-btn'> OK </button>
        </div>
        </form>
    )
}

WrapForm.propTypes = {

}

export default WrapForm

