import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'

function Edit({match}) {
    const [post, setPost] = useState()

    function handleFetch() {
        const data = {"id": +match.params.id, "content": `${post}`}
        console.log(match.params.id) 
        fetch('http://localhost:7777/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(post)
    }

    function handleChange(event) {
        setPost(event.target.value)
    }

    return (
        <div>
            <Link exact='true' to={`/posts/${match.params.id}`} className='close'>
                <button>Cloed</button>
            </Link>
            <div className="field">
                <input type="text" onChange={handleChange}/>
            </div>
            <div>
                <img src="" alt=""/>
                <div className='sense'></div>
                <div className="gif"></div>
                <div className="friends"></div>
                <div className="check-point"></div>
            </div>
            <footer>
                <button onClick={handleFetch}>Сохранить</button>
            </footer>
        </div>
    )
}

export default Edit

