import React from 'react'
import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import PostContext from './PostContext'

function PostsProvider(props) {
    
    const posts = props.posts;

    // function handleFetch() {
    //       fetch('http://localhost:7777/posts')
    //         .then(resp => resp.json())
    //         .then(data => {
    //             setPosts(data)
    //             console.log(data)
    //             console.log('This is work...')
    //         })
    //     }
      
    //     useEffect(() => {
    //       handleFetch();
    //     }, [])
    
    return (
        <PostContext.Provider value={posts}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostsProvider;

