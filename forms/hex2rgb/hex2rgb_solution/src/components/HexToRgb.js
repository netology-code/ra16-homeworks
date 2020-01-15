import React from 'react'
import PropTypes from 'prop-types'

function HexToRgb(props) {

    const hexArray = Array.from(props.hexCode);
    let rgb;
    if(hexArray.length === 7 && hexArray[0] === '#') {
        let r = parseInt(hexArray[1] + hexArray[2], 16);
        let g = parseInt(hexArray[3] + hexArray[4], 16);
        let b = parseInt(hexArray[5] + hexArray[6], 16);

        rgb = isNaN(r) || isNaN(g) || isNaN(b) ? 'ОШИБКА' : `rgb(${r}, ${g}, ${b})`;
    }
    
    let newStyle = {
        backgroundColor: rgb,
        color: rgb !== 'rgb(255, 255, 255)' ? 'white' : 'black'
    }

    return (
        <div className='wrap-main'>
            <p className='result' style={rgb === 'ОШИБКА' ? {backgroundColor: 'red', color: 'white'} : newStyle}>
                {rgb === undefined ? '' : rgb}
            </p> 
        </div>
                       
    )
}

HexToRgb.propTypes = {

}

export default HexToRgb

