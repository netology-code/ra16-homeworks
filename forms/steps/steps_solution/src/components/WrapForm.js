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
            <div className='list-wrap'>
                <div>
                    <p className='header-info'>Дата (ДД.ММ.ГГ)</p>
                    <p className='header-info'>Пройдено км</p>
                    <p className='header-info'>Действия</p>
                </div>
                <ul className='days-list'>
                    {days
                        .sort((a, b) => {
                            const date = new Date(a.date.split('.').reverse().join('-'));
                            const date2 = new Date(b.date.split('.').reverse().join('-'));
                            return date - date2
                        })
                        .reverse()
                        .map( o => 
                            <li className='day-info' key={o.id}>
                                <p className='day-data'>{o.date}</p>
                                <p className='day-data'>{o.distance}</p>
                                <button className='day-data delete-btn' onClick={() => handleRemove(o.id)}>✘</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

WrapForm.propTypes = {

}

export default WrapForm

