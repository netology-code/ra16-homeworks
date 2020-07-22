import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PostContext from './PostContext';

export default function List(props) {
    // const [posts, setPosts] = useState()
    const posts = useContext(PostContext);
    const handleFetch = () => {
        props.fetch()
    }

    // useEffect(() => {
    //     handleFetch()
    // }, )
    // useEffect(() => {
    //     fetch('http://localhost:7777/posts')
    //     .then(resp => resp.json())
    //     .then(data => {
    //         setPosts(data)
    //     })
    // }, [])

    return (
        <div>
            <div className="create-button">
                <Link exact='true' to='/posts/new'>Созадть пост</Link>
            </div>
            {posts ? posts.map((el, index) => <Link exact='true' to={`/posts/${el.id}`} key={index}><p>{el.content}</p></Link>) : null}
        </div>
    )
}
