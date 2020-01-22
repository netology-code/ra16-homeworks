import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react'
import DaySteps from './DaySteps'
import ListDaysSteps from './ListDaysSteps'

function WrapForm(props) {
    const [form, setForm] = useState({
        date: '',
        distance: ''
    })

    // const handleChange = evt => {
    //     const {name, value} = evt.target;
    //     setForm(prevForm => ({...prevForm, [name]: value}));
    // }

    const handleForm = evt => {
        evt.preventDefault();
        console.log(evt.target[0].value, evt.target[1].value);
        setForm({date: evt.target[0].value, distance: evt.target[1].value});
    }

    console.log(form);

    return (
        <form onSubmit={handleForm}>
            <DaySteps />
            <ListDaysSteps data={form}/>
        </form>
    )
}

WrapForm.propTypes = {

}

export default WrapForm

