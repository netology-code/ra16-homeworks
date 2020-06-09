import React from 'react'
import useJsonFetch from './useJsonFetch'

export default function GetLoading(props) {
    const [{isLoading}] = useJsonFetch(props.url, props.opts)

    return (
        <div>
            {isLoading && <p className='loading'>...Loading</p>}
        </div>
    )
}
