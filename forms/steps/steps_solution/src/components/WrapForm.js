import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react'
import nanoid from 'nanoid'
import DayModel from './DayModel'

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
        const day = new DayModel(nanoid(), form.date, form.distance);
        setDays(prevDays => [...prevDays, day]);
        setForm(baseForm);
    }

    const handleRemove = id => {
        setDays(prevDays => prevDays.filter(day => day.id !== id))
    }

    return (
        <React.Fragment>
            <form onSubmit={handleForm}>
            <div className='day-wrap'>
                <div className='day'>
                    <label htmlFor='name'>Дата (ДД. ММ. ГГ.)</label>
                    <input name='date' value={form.date} onChange={handleChange}/>
                </div>
                <div className='day'>
                    <label htmlFor='name'>Пройдено км</label>
                    <input name='distance' value={form.distance} onChange={handleChange}/>
                </div>
                <button className='day'> OK </button>
            </div>
            {/* <DaySteps /> */}
            {/* <ListDaysSteps data={form}/> */}
            </form>
            <ul>
                {days.map( o => 
                    <li key={o.id}>
                        <p>{o.date}</p>
                        <p>{o.distance}</p>
                        <button onClick={() => handleRemove(o.id)}>Dlt</button>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}

WrapForm.propTypes = {

}

export default WrapForm

