import React from 'react'
import { Link } from 'react-router-dom'

export default function View() {
    return (
        <div>
            <p>Это пост-пост</p>
            <Link exact='true' to='/' className='close'>X</Link>
        </div>
    )
}
