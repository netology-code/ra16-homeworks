import React from 'react'
import { Link } from 'react-router-dom'

export default function NewPost() {
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

            </div>
            <button className='post'>Опубликовать</button>
        </div>
    )
}
