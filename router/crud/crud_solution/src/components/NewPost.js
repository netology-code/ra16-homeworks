import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NewPost() {

    const [state, setState] = useState();

    function handlePublic() {
        const data = {"id": 0, "content": `${state}`}
        fetch('http://localhost:7777/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setState('');
    }

    function handleChange(event) {
        setState(event.target.value)
    }

    return (
        <div>
            <nav>
                <div className="public">Публикация</div>
                <div className="foto">Фото/Видео</div>
                <div className="stream">Прямой эфир</div>
                <div className="else">...Ещё</div>
                <Link exact='true' to='/' className='close'>X</Link>
            </nav>
            <div className='field'>
                <input type="text" onChange={handleChange}/>
            </div>
            <button className='post'onClick={handlePublic}>
                <Link exact='true' to='/' className='close'>
                    Опубликовать
                </Link>
            </button>
        </div>
    )
}
