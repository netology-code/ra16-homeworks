import React from 'react'
import PropTypes from 'prop-types'
import useJsonFetch from './useJsonFetch'

function GetData(props) {
    const [{data}] = useJsonFetch(props.url, props.opts)

    return (
        <div>
            {data ? <p className='data'>{data}</p> : null}
        </div>
    )
}

GetData.propTypes = {

}

export default GetData

