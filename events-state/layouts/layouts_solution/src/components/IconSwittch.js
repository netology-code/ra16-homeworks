import React from 'react'

function IconSwittch(props) {
    const iconName = props.name;
    const onSwitch = () => {
        props.onSwitch(props.name)
    }

    return (
        <div className='icon'>
            <button className='button-icon' onClick={onSwitch}>
                <i className='material-icons'>{iconName}</i>
            </button>
        </div>
    )
}

export default IconSwittch;
