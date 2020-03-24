import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react';
import DayModel from './DayModel';
import nanoid from 'nanoid';

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

    const handleRemove = (id) => {
        return props.onRemove(id)
    }

    const handleSetDaysList = (day) => {
        return props.onSubmit(day)
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }
  
    const handleForm = evt => {
        evt.preventDefault();
        const checkDay = days.filter(day => day.date === form.date);
  
        if(checkDay.length > 0) {
            const day = new DayModel(nanoid(), checkDay[0].date, `${+form.distance + +checkDay[0].distance}`);
            handleRemove(checkDay[0].id);
            handleSetDaysList(day);
        } else {
            const day = new DayModel(nanoid(), form.date, form.distance);
            handleSetDaysList(day);
        }
  
        setForm(baseForm);
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

