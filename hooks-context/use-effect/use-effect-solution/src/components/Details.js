import React from 'react'
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function Details(props) {
    const [info, setInfo] = useState({})
    const [id, setId] = useState('')
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        if(id === props.info.id) {
            return
        } else {
            setInfo({});
            setLoading(true);
            setId(props.info.id);
            const newId = props.info.id; 
            fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${newId}.json`)
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    setInfo(data)
                })
        }        
    }, [props, id])

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && 
                <div className='info'>
                    <img src={info.avatar} alt="foto"/>
                    <p>{info.name}</p>
                    <p>{info.details ? info.details.city : null}</p>
                    <p>{info.details ? info.details.company : null}</p>
                    <p>{info.details ? info.details.position : null}</p>
                </div>
            }
        </div>
        
    )
}

Details.propTypes = {

}

export default Details

