import React from 'react'
import PostContext from './PostContext'
import {useState, useEffect} from 'react'

function PostsProvider(props) {
    
    const posts = props.posts;
    // const [posts, setPosts] = useState()

    // useEffect(() => {
    //     fetch('http://localhost:7777/posts')
    //     .then(resp => resp.json())
    //     .then(data => {
    //         setPosts(data)
    //     })
    // }, [])

    return (
        <PostContext.Provider value={posts} >
            {props.children}
        </PostContext.Provider>
    )
}

export default PostsProvider;

