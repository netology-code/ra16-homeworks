import React from 'react'
import PropTypes from 'prop-types'

function HexToRgb(props) {
    const hexCodeRight = props.hexCode.length === 7 ? props.hexCode : null;
    const hexArray = Array.from(props.hexCode);
    let rgb;
    if(hexArray.length === 7 && hexArray[0] === '#') {
        let r = parseInt(hexArray[1] + hexArray[2], 16);
        let g = parseInt(hexArray[3] + hexArray[4], 16);
        let b = parseInt(hexArray[5] + hexArray[6], 16);

        rgb = `${r}, ${g}, ${b}`;
    }
    console.log(rgb);

    return (
        <div>
            <p>
                {`rgb(${rgb})`}
            </p>            
        </div>
    )
}

HexToRgb.propTypes = {

}

export default HexToRgb

