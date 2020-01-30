import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
function Navigation(props) {
    return (
        <nav className='nav_bar'>
            <ul className='nav_bar_list'>
                {props.list.map(item => <li>
                    <Link link={item.href} class='nav_bar_link'>{item.name}</Link>
                </li>)}
            </ul>
        </nav>
    )
}

Navigation.propTypes = {

}

export default Navigation

