import React from 'react'
import PropTypes from 'prop-types'
import DateTime from './DateTime'
import DateTimePretty from './DateTimePretty'

function Video(props) {
    
    const  DateView = DateTimePretty(DateTime, props.date);

    return ( 
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateView />
        </div>
    )
}

Video.propTypes = {

}

export default Video

