import React from 'react'
import PropTypes from 'prop-types'

function ProjectList(props) {
    const {projects} = props;

    return (
        <div className='projects'>
            {projects.map(el => <img className='listItem' src={el.img} alt={el.category}/>)}
        </div>
    )
}

ProjectList.propTypes = {

}

export default ProjectList;

