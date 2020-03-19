import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react'
import nanoid from 'nanoid'
import DayModel from './DayModel'
import List from './List'

function WrapForm(props) {
    const baseForm = {
        date: '',
        distance: ''
    };
    const [form, setForm] = useState({
        date: '',
        distance: ''
    });
    const [days, setDays] = useState([]);

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
            setDays(prevDays => [...prevDays, day]);
        } else {
            const day = new DayModel(nanoid(), form.date, form.distance);
            setDays(prevDays => [...prevDays, day]);
        }

        setForm(baseForm);
    }

    const handleRemove = id => {
        setDays(prevDays => prevDays.filter(day => day.id !== id))
    }

    return (
        <React.Fragment>
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
            <List listDays={days} onRemove={handleRemove}/>
        </React.Fragment>
    )
}

WrapForm.propTypes = {

}

export default WrapForm

