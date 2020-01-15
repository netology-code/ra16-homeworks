import React from 'react'
import PropTypes from 'prop-types'
import {useState} from 'react'
import HexToRgb from './HexToRgb';

function InputHex(props) {
    const [form, setForm] = useState({
        name: '',
        score: 'good',
        agreement: false
    });

    const handleChange = (event) => {
        setForm(prevForm => ({...prevForm, name: event.target.value}));
        event.persist()
    }

    return (
        <div className='wrap-main absolute'>
            <div className='wrap-main'>
                <input id="hexName" name="name" value={form.name} onChange={handleChange} />
            </div>
            <HexToRgb hexCode={form.name.length === 7 ? form.name : 0}/>
        </div>
    )
}

InputHex.propTypes = {

}

export default InputHex

