import React from 'react'
import useJsonFetch from './useJsonFetch'

export default function GetError(props) {
    const [{hasError}] = useJsonFetch(props.url, props.opts)

    return (
        <div>
            {hasError && <p className='error'>{hasError}</p>}        
        </div>
    )
}
