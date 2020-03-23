import React from 'react'
import PropTypes from 'prop-types'

function List(props) {
    const days = props.listDays;
    
    const handleRemove = (id) => {
        return props.onRemove(id)
    }

    return (
        <div className='list-wrap'>
            <div>
                <p className='header-info'>Дата (ДД.ММ.ГГ)</p>
                <p className='header-info'>Пройдено км</p>
                <p className='header-info'>Действия</p>
            </div>
            <ul className='days-list'>
                {days
                    .sort((a, b) => {
                        const date = new Date(a.date.split('.').reverse().join('-'));
                        const date2 = new Date(b.date.split('.').reverse().join('-'));
                        return date - date2
                    })
                    .reverse()
                    .map( o => 
                        <li className='day-info' key={o.id}>
                            <p className='day-data'>{o.date}</p>
                            <p className='day-data'>{o.distance}</p>
                            <button className='day-data delete-btn' onClick={() => handleRemove(o.id)}>✘</button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

List.propTypes = {

}

export default List

