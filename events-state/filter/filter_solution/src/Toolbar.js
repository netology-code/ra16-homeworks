import React from 'react'
import PropTypes from 'prop-types'

function Toolbar(props) {
    const {filter, selected} = props;
    
    const Chosen = () => {
        props.onChangeSelected(props.filter);
    }

    return (
            <input className={filter === selected ? 'select' : 'unSelected'} type='button' value={filter} onClick={Chosen}/>
    )
}

Toolbar.propTypes = {

}

export default Toolbar;

