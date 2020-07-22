import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostConstext from './PostContext'

export default function View({match}) {
    
    const posts = useContext(PostConstext);
    const currentId = +match.params.id
    
    const post = posts.find(o => 
        o.id === currentId
    )
    
    function handleDelet() {
        fetch(`http://localhost:7777/posts/${+match.params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    
    return (
        <div>
            <p>{post ? post.content : 'Not found'}</p>
            <Link exact='true' to='/' className='close'>X</Link>
            <button>Изменить</button>
            <Link exact='true' to='/' className='close'>
                <button onClick={handleDelet}>Удалить</button>
            </Link>
        </div>
    )
}
