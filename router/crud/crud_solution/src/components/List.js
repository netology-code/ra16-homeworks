import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import PostContext from './PostContext';

export default function List() {
   
    const allPosts = useContext(PostContext);
    console.log(useContext(PostContext))
    return (
        <div>
            <div className="create-button">
                <Link exact='true' to='/posts/new'>Созадть пост</Link>
            </div>
            {allPosts ? allPosts.map((el, index) => <Link exact='true' to={`/posts/${el.id}`} key={index}><p>{el.content}</p></Link>) : null}
        </div>
    )
}
