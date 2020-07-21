import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostConstext from './PostContext'

export default function View({match}) {
    const posts = useContext(PostConstext);
    const matchId = +match.params.id
    console.log(posts);
    const post = posts.find(o => 
        o.id === +match.params.id
    )
    console.log(post)
    return (
        <div>
            <p>{post ? post.content : 'Not found'}</p>
            <Link exact='true' to='/' className='close'>X</Link>
        </div>
    )
}
