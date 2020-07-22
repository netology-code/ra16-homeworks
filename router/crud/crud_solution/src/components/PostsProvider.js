import React from 'react'
import PostContext from './PostContext'

function PostsProvider(props) {
    
    const posts = props.posts;
    
    return (
        <PostContext.Provider value={posts} >
            {props.children}
        </PostContext.Provider>
    )
}

export default PostsProvider;

