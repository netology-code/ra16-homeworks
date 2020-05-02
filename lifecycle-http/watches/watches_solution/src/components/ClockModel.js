import React from 'react';

class ClockModel extends React.Component{
    
    render() {
    return(
        <article className='clock'>
            <div className="hours-container">
                <div className="hours"></div>
            </div>
            <div className="minutes-container">
                <div className="minutes"></div>
            </div>
            <div className="seconds-container">
                <div className="seconds"></div>
            </div>
        </article>
    )
    }
}

export default ClockModel;