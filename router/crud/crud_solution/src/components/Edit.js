import React from 'react'
import { Link } from 'react-router-dom'

function Edit({match}) {

    return (
        <div>
            <Link exact='true' to={`/posts/${match.params.id}`} className='close'>
                <button>Cloed</button>
            </Link>
        </div>
    )
}

export default Edit

