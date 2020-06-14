import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function List() {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch('http://localhost:7777/posts')
        .then(resp => resp.json())
        .then(data => {
            setPosts(data)
            console.log(data)
        })

    }, [])

    return (
        <div>
            <div className="create-button">
                <Link exact='true' to='/posts/new'>Созадть пост</Link>
            </div>
            {posts ? posts.map((el, index) => <Link exact='true' to='/posts/view' key={index}><p>{el.content}</p></Link>) : null}
        </div>
    )
}
