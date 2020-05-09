import React from 'react'
import PropTypes from 'prop-types'

function AllNotes(props) {
    return (
        <ul className='allNotes'>
            {props.notes.map(el => 
              <li key={el.id} className='note'>
                <p>{el.content}</p>
                <button onClick={() => {props.delet(el.id)}}>X</button>
              </li>
            )}
          </ul>
    )
}

AllNotes.propTypes = {

}

export default AllNotes

